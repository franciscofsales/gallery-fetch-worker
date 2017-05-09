import React, { PropTypes, Component } from 'react';
const Worker = require('worker-loader!./worker');

export const Loader = imgs => ComposedComponent => {
	const images = imgs;

	class LoaderWrapper extends Component {
		constructor(props) {
			super(props);
			this._worker = new Worker();
			this.state = {
				images: []
			};
		}

		componentDidMount() {
			this.setState({ images: images }, this._initWorker);
		}

		componentWillUnmount() {
			if (this._worker) {
				this._worker.terminate();
			}
		}

		_initWorker = () => {
			this._worker.onmessage = e => {
				const { blob, src } = e.data;
				const index = this.state.images.findIndex(img => img.src === src);

				if (index > -1) {
					const reader = new FileReader();

					reader.onerror = err => {
						console.log(err);
					};
					reader.onload = () => {
						if (!!reader.result) {
							this.setState({
								images: [
									...this.state.images.slice(0, index),
									{
										...this.state.images[index],
										blob,
										data: reader.result
									},
									...this.state.images.slice(index + 1)
								]
							});
						} else {
							console.log('error converting to data64');
						}
					};
					reader.readAsDataURL(blob);
				}
			};

			if (this.state.images) {
				this._worker.postMessage({
					images: this.state.images
				});
			}
		};

		render() {
			return <ComposedComponent {...this.props} images={this.state.images} />;
		}
	}
	return LoaderWrapper;
};

export default Loader;

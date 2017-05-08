import React, { PropTypes, Component } from 'react';
const Worker = require('worker-loader!./worker');
const worker = new Worker();

class ImageLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			selected: 0
		};
	}

	componentDidMount() {
		this.setState({ images: this.props.images }, this._initWorker);
	}

	componentWillUnmount() {
		console.log('terminating');
		if (worker) {
			console.log('terminating worker');
			worker.terminate();
		}
	}

	_initWorker = () => {
		worker.onmessage = e => {
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
			worker.postMessage({
				images: this.props.images,
				selected: this.props.images[this.state.selected]
			});
		}
	};

	_selectNext = () => {
		this.setState({
			selected: this.state.selected + 1 >= this.state.images.length
				? 0
				: this.state.selected + 1
		});
	};

	_getImageSrc = img => {
		if (!img) {
			return null;
		}
		if (img.data) {
			// console.log(img);
			return img.data;
		}
		return img.src;
	};

	render() {
		return (
			<div onClick={this._selectNext}>
				<img
					style={{ width: 200, height: 200 }}
					src={this._getImageSrc(this.state.images[this.state.selected])}
					alt="testing"
				/>
			</div>
		);
	}
}

ImageLoader.propTypes = {
	images: PropTypes.array
};

export default ImageLoader;

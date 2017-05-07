import React, { PropTypes, Component } from 'react';
const Worker = require('worker-loader!./worker');
const worker = new Worker();

class ImageLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: []
		};
	}

	componentDidMount() {
		this.setState({ images: this.props.images }, this._initWorker);
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
			worker.postMessage(this.props.images);
		}
	};

	_getImageSrc = img => {
		if (img.data) {
			// console.log(img);
			return img.data;
		}
		return img.src;
	};

	render() {
		return (
			<div>
				{this.state.images.map((img, i) => (
					<img
						style={{ width: 200, height: 200 }}
						src={this._getImageSrc(img)}
						alt="testing"
						key={`image_${i}`}
					/>
				))}
			</div>
		);
	}
}

ImageLoader.propTypes = {
	images: PropTypes.array
};

export default ImageLoader;

import React, { PropTypes } from 'react';
import ImageLoader from './lib';

const images = [
	{
		src: 'http://images.fonearena.com/blog/wp-content/uploads/2013/11/IMG_20131107_125421.jpg'
	},
	{
		src: 'http://images.fonearena.com/blog/wp-content/uploads/2013/11/Lenovo-p780-camera-sample-10.jpg'
	},
	{
		src: 'https://cdn0.vox-cdn.com/thumbor/8unYqc9Pq6cY079KWWvsTU4LeQA=/cdn0.vox-cdn.com/uploads/chorus_asset/file/4171974/WP_20150906_10_02_20_Rich_LI.0.jpg'
	},
	{
		src: 'http://3.bp.blogspot.com/-lMn_VHMzU1Y/Vmt7rvpTASI/AAAAAAAARK8/OjjYrYlu2SE/s1600/gizguide-lg-g4-beat-macro.png'
	}
];

class ImageViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 0
		};
	}
	_getImageSrc = img => {
		if (!img) {
			return null;
		}
		if (img.data) {
			return img.data;
		}
		return img.src;
	};
	_selectNext = () => {
		this.setState({
			selected: this.state.selected + 1 >= this.props.images.length
				? 0
				: this.state.selected + 1
		});
	};
	render() {
		return (
			<div onClick={this._selectNext}>
				<img
					style={{ width: 200, height: 200 }}
					src={this._getImageSrc(this.props.images[this.state.selected])}
					alt="testing"
				/>
			</div>
		);
	}
}

export default ImageLoader(images)(ImageViewer);

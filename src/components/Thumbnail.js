import React, { Component } from 'react';

export default class Thumbnail extends Component {
	render() {
		return (
			<div className="thumbnail-container">
				<img
					className="video-thumbnail"
					src={this.props.videoInfo.snippet.thumbnails.high.url}
				/>
				<div className="video-title">{this.props.videoInfo.snippet.title}</div>
			</div>
		);
	}
}

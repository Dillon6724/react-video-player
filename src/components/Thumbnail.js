import React, { Component } from 'react';

export default class Thumbnail extends Component {
	render() {
		const newId = this.props.videoInfo.snippet.resourceId.videoId;
		return (
			<a
				href="#"
				onClick={this.props.onChangeVideo.bind(this, newId)}
				className="thumbnail-container">
				<img
					className="video-thumbnail"
					src={this.props.videoInfo.snippet.thumbnails.high.url}
				/>
				<div className="video-title">{this.props.videoInfo.snippet.title}</div>
			</a>
		);
	}
}

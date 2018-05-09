import React, { Component, Fragment } from 'react';

export default class Thumbnail extends Component {
	render() {
		const newId = this.props.videoInfo.snippet.resourceId.videoId;
		const formattedTitle =
			this.props.videoInfo.snippet.title.substr(0, 53) + '...';
		const title = this.props.videoInfo.snippet.title;

		return (
			<a href="#">
				<img
					className="video-thumbnail"
					src={this.props.videoInfo.snippet.thumbnails.high.url}
					onClick={this.props.onChangeVideo.bind(this, newId)}
				/>
				{title.length < 53 ? (
					<span
						className="video-title"
						onClick={this.props.onChangeVideo.bind(this, newId)}>
						{title}
					</span>
				) : (
					<span
						className="video-title"
						onClick={this.props.onChangeVideo.bind(this, newId)}>
						{formattedTitle}
					</span>
				)}
			</a>
		);
	}
}

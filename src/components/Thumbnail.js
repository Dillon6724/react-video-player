import React, { Component, Fragment } from 'react';

export default class Thumbnail extends Component {
	render() {
		const newId = this.props.videoInfo.snippet.resourceId.videoId;
		const formattedTitle =
			this.props.videoInfo.snippet.title.substr(0, 53) + '...';
		const title = this.props.videoInfo.snippet.title;

		return (
			<a className="link" href="#">
				<img
					className="video-thumbnail"
					src={this.props.videoInfo.snippet.thumbnails.medium.url}
					onClick={this.props.onChangeVideo.bind(
						this,
						newId,
						this.props.videoInfo.snippet.title
					)}
				/>
				{title.length < 53 ? (
					<span
						className="video-title"
						onClick={this.props.onChangeVideo.bind(
							this,
							newId,
							this.props.videoInfo.snippet.title
						)}>
						{title}
					</span>
				) : (
					<span
						className="video-title"
						onClick={this.props.onChangeVideo.bind(
							this,
							newId,
							this.props.videoInfo.snippet.title
						)}>
						{formattedTitle}
					</span>
				)}
			</a>
		);
	}
}

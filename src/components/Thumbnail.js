import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

export default class Thumbnail extends Component {
	render() {
		const newId = this.props.videoInfo.snippet.resourceId.videoId;
		const formattedTitle =
			this.props.videoInfo.snippet.title.substr(0, 50) + '...';
		const title = this.props.videoInfo.snippet.title;
		let playing = '';
		let hidden = '';
		if (this.props.currentVideo === newId) {
			playing = ' current-playing';
			hidden = 'hidden';
		}
		return (
			<li
				onClick={e => {
					e.preventDefault();
					this.props.onChangeVideo(newId, this.props.videoInfo.snippet.title);
				}}
				className="link"
				tabIndex="0">
				<img
					alt={`Link to play video titled: ${title}`}
					className={`video-thumbnail${playing}`}
					src={this.props.videoInfo.snippet.thumbnails.medium.url}
				/>
				{title.length < 53 ? (
					<span className={`video-title${hidden}`}>{title}</span>
				) : (
					<span className={`video-title${hidden}`}>{formattedTitle}</span>
				)}
				{hidden.length > 1 ? (
					<span className="playing-title">NOW PLAYING</span>
				) : (
					<span className="playing-title hidden">"NOW PLAYING"</span>
				)}
			</li>
		);
	}
}

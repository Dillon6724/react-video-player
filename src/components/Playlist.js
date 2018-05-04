import React, { Component } from 'react';
import Thumbnail from './Thumbnail';

export default class Playlist extends Component {
	render() {
		return (
			<div className="playlist-container">
				{this.props.playlist.map((video, i) => {
					return (
						<Thumbnail
							key={i}
							videoInfo={video}
							onChangeVideo={this.props.onChangeVideo}
						/>
					);
				})}
			</div>
		);
	}
}

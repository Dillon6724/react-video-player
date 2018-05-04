import React, { Component } from 'react';
import Playlist from './Playlist';
export default class PlaylistContatiner extends Component {
	render() {
		return (
			<div className="playlist-section-container">
				{this.props.playlistData.map((playlist, i) => {
					return (
						<Playlist
							onChangeVideo={this.props.onChangeVideo}
							key={i}
							playlist={playlist}
						/>
					);
				})}
			</div>
		);
	}
}

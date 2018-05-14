import React, { Component, Fragment } from 'react';
import Playlist from './Playlist';

export default class PlaylistContatiner extends Component {
	render() {
		return (
			<div className="playlist-container">
				<h1 className="title">{this.props.title}</h1>
				{this.props.playlistArray.map((playlist, i) => {
					return (
						<Fragment>
							<h2 className="playlist-title">{playlist.playlistTitle}</h2>
							<Playlist
								onChangeVideo={this.props.onChangeVideo}
								key={i}
								playlist={playlist.playlistArray}
							/>
						</Fragment>
					);
				})}
			</div>
		);
	}
}

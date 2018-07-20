import React, { Component, Fragment } from 'react';
import Playlist from './Playlist';

export default class PlaylistContatiner extends Component {
	render() {
		return (
			<div className="playlist-container">
				<h1 className="title">{this.props.title}</h1>
				{this.props.playlistArray.map((playlist, i) => {
					return (
						<Fragment key={i}>
							<h2 onClick={this.props.focus} className="playlist-title">
								{playlist.playlistTitle}
							</h2>
							<Playlist
								currentVideo={this.props.currentVideo}
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

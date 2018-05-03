import React, { Component } from 'react';
import YouTube from 'react-youtube';
import helpers from '../utils/helpers';
import PlaylistContatiner from './PlaylistContatiner';
require('./styles.scss');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentVideo: '',
			playlistData: [],
			playing: true
		};

		this._onPause = this._onPause.bind(this);
		this._onEnd = this._onEnd.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
	}

	// REACT LIFE CYCLE METHODS
	componentDidMount() {
		const playlistData = helpers
			.getPlaylistData(
				this.props.customPlayerOptions.playlistIds,
				this.props.customPlayerOptions.apiKey
			)
			.then(playlistData => {
				this.setState({
					playlistData,
					currentVideo: playlistData[0][0].snippet.resourceId.videoId
				});
			});
	}

	// YOUTUBE METHODS
	_onPause(event) {
		this.setState({
			playing: false
		});
	}

	_onPlay(event) {
		event.target.playVideo();
	}

	_onStateChange(event) {
		if (event.data === 5 && this.state.playing) {
			event.target.playVideo();
		}
	}

	_onEnd(event) {
		console.log(event);
		// nextVideo();
	}

	render() {
		return (
			<div>
				<YouTube
					opts={helpers.opts}
					videoId={this.state.currentVideo}
					onPause={this._onPause}
					onEnd={this._onEnd}
					onPlay={this._onPlay}
					onStateChange={this._onStateChange}
				/>
				<PlaylistContatiner playlistData={this.state.playlistData} />
			</div>
		);
	}
}

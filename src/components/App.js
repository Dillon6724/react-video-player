import React, { Component, Fragment } from 'react';
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
		this._onPlay = this._onPlay.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
		this.onChangeVideo = this.onChangeVideo.bind(this);
		this.playNextVideo = this.playNextVideo.bind(this);
		this.getNewIndex = this.getNewIndex.bind(this);
	}

	// CUSTOM METHODS
	onChangeVideo(id, event) {
		event.preventDefault();
		this.setState({
			currentVideo: id
		});
	}

	playNextVideo(event) {
		const currentVideoId = this.state.currentVideo;
		this.state.playlistData.forEach((playlist, playlistIndex) => {
			playlist.forEach((video, videoIndex) => {
				const nextVideoId = this.state.playlistData[playlistIndex][videoIndex]
					.snippet.resourceId.videoId;
				if (currentVideoId === nextVideoId) {
					const newIndex = this.getNewIndex(videoIndex, playlistIndex);
					this.setState({
						currentVideo: this.state.playlistData[newIndex.playlist][
							newIndex.video
						].snippet.resourceId.videoId
					});
				}
			});
		});
	}

	getNewIndex(videoIndex, playlistIndex) {
		const totalVideos =
			Object.keys(this.state.playlistData[playlistIndex]).length - 1;
		const totalPlaylists = this.state.playlistData.length - 1;
		if (videoIndex + 1 <= totalVideos) {
			videoIndex++;
			return { playlist: playlistIndex, video: videoIndex };
		} else if (playlistIndex + 1 <= totalPlaylists) {
			playlistIndex++;
			return { playlist: playlistIndex, video: 0 };
		} else {
			return { playlist: 0, video: 0 };
		}
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
		if (event.data === 0) {
			this.playNextVideo(event);
		}
	}

	render() {
		return (
			<Fragment>
				<YouTube
					opts={helpers.opts}
					videoId={this.state.currentVideo}
					onPause={this._onPause}
					onEnd={this._onEnd}
					onPlay={this._onPlay}
					onStateChange={this._onStateChange}
				/>
				<PlaylistContatiner
					onChangeVideo={this.onChangeVideo}
					playlistData={this.state.playlistData}
				/>
			</Fragment>
		);
	}
}

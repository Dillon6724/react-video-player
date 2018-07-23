import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';
import helpers from '../utils/helpers';
import PlaylistContatiner from './PlaylistContatiner';

require('./styles.scss');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentVideo: '',
			playlistArray: [],
			playing: true,
			title: ''
		};

		this.playlist = React.createRef();

		this._onPause = this._onPause.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onStateChange = this._onStateChange.bind(this);
		this.onChangeVideo = this.onChangeVideo.bind(this);
		this.playNextVideo = this.playNextVideo.bind(this);
		this.getNewIndex = this.getNewIndex.bind(this);
	}

	// CUSTOM METHODS
	onChangeVideo(id, newTitle) {
		this.setState({
			currentVideo: id,
			title: newTitle,
			focusOnPlayer: true
		});
	}

	playNextVideo(event) {
		const currentVideoId = this.state.currentVideo;
		this.state.playlistArray.forEach((playlist, playlistIndex) => {
			playlist.playlistArray.forEach((video, videoIndex) => {
				const nextVideoId = this.state.playlistArray[playlistIndex]
					.playlistArray[videoIndex].snippet.resourceId.videoId;
				if (currentVideoId === nextVideoId) {
					const newIndex = this.getNewIndex(videoIndex, playlistIndex);
					this.setState({
						currentVideo: this.state.playlistArray[newIndex.playlist]
							.playlistArray[newIndex.video].snippet.resourceId.videoId,
						title: this.state.playlistArray[newIndex.playlist].playlistArray[
							newIndex.video
						].snippet.title
					});
				}
			});
		});
	}

	getNewIndex(videoIndex, playlistIndex) {
		const totalVideos =
			Object.keys(this.state.playlistArray[playlistIndex].playlistArray)
				.length - 1;
		const totalPlaylists = this.state.playlistArray.length - 1;
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
		helpers
			.getPlaylistData(
				this.props.customPlayerOptions.playlistConfig,
				this.props.customPlayerOptions.apiKey
			)
			.then(playlistArray => {
				this.setState({
					playlistArray,
					currentVideo:
						playlistArray[0].playlistArray[0].snippet.resourceId.videoId,
					title: playlistArray[0].playlistArray[0].snippet.title
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
			event.target.muteVideo();
		}
		if (event.data === 0) {
			this.playNextVideo(event);
		}
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
					ref={player => {
						this.player = player;
					}}
				/>
				<PlaylistContatiner
					onChangeVideo={this.onChangeVideo}
					playlistArray={this.state.playlistArray}
					title={this.state.title}
					focus={this.focus}
					ref={this.playlist}
					currentVideo={this.state.currentVideo}
				/>
			</div>
		);
	}
}

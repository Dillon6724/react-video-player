import React, { Component } from 'react';
import YouTube from 'react-youtube';
import helpers from '../helpers';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentVideo: '',
			playlistData: []
		};
		this._onReady = this._onReady.bind(this);
	}

	componentDidMount() {
		const playlistData = helpers
			.getPlaylistData(
				this.props.customPlayerOptions.playlistIds,
				this.props.customPlayerOptions.apiKey
			)
			.then(playlistData => {
				this.setState({
					playlistData,
					currentVideo: playlistData[0].items[0].snippet.resourceId.videoId
				});
			});
	}

	_onReady(event) {
		event.target.playVideo();
	}

	render() {
		return (
			<div>
				<YouTube videoId={this.state.currentVideo} onReady={this._onReady} />
			</div>
		);
	}
}

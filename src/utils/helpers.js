import axios from 'axios';

const helpers = {
	async getPlaylistData(playlistInfo, apiKey) {
		const allPlaylistData = await Promise.all(
			playlistInfo.map(async playlistObj => {
				const res = await axios.get(
					`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&fields=items&maxResults=50&playlistId=${
						playlistObj.playlistId
					}&key=${apiKey}`
				);
				const filteredData = res.data.items.filter(item => {
					if (!item.snippet.thumbnails) {
						return false;
					}
					return true;
				});
				const formattedPlaylist = {
					playlistTitle: playlistObj.playlistTitle,
					playlistArray: filteredData
				};
				return await formattedPlaylist;
			})
		);
		return allPlaylistData;
	},

	opts: {
		height: '600px',
		width: '100%',
		playerVars: {
			autoplay: 1,
			automute: 1
		}
	}
};

export default helpers;

import axios from 'axios';

const helpers = {
	async getPlaylistData(playlistIds, apiKey) {
		const allPlaylistData = await Promise.all(
			playlistIds.map(async playlistId => {
				const res = await axios.get(
					`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&fields=items&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
				);
				return await res.data;
			})
		);
		return allPlaylistData;
	}
};

export default helpers;

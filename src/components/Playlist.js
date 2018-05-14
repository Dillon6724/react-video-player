import React, { Component } from 'react';
import Thumbnail from './Thumbnail';
import Slider from 'react-slick';

export default class Playlist extends Component {
	render() {
		var settings = {
			arrows: true,
			accessability: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3
		};
		return (
			<Slider {...settings}>
				{this.props.playlist.map((video, i) => {
					return (
						<Thumbnail
							key={i}
							videoInfo={video}
							onChangeVideo={this.props.onChangeVideo}
						/>
					);
				})}
			</Slider>
		);
	}
}

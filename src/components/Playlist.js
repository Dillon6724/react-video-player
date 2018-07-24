import React, { Component, Fragment } from 'react';
import Thumbnail from './Thumbnail';
import Slider from 'react-slick';

export default class Playlist extends Component {
	render() {
		var settings = {
			arrows: true,
			focusOnSelect: false,
			accessability: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			slide: 'li',
			responsive: [
				{
					breakpoint: 1199,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						infinite: true
					}
				},
				{
					breakpoint: 720,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				}
			]
		};
		return (
			<Slider {...settings}>
				{this.props.playlist.map((video, i) => {
					return (
						<Thumbnail
							key={i}
							index={i}
							videoInfo={video}
							onChangeVideo={this.props.onChangeVideo}
							currentVideo={this.props.currentVideo}
						/>
					);
				})}
			</Slider>
		);
	}
}

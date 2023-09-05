'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import LetterAvatar from '../LetterAvatar';

// CAROUSEL SETTINGS
export default class Live extends Component<any> {
	render() {
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: false,
			autoplay: true,
			speed: 10000,
			autoplaySpeed: 0,
			cssEase: 'linear',
			centerMode: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: true,
						dots: false,
					},
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
						dots: false,
					},
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: false,
					},
				},
			],
		};

		let { rooms } = this.props;

		const Player = (props: any) => {
			return (
				<div className='flex flex-col items-center'>
					<div className='flex items-center justify-center'>
						<LetterAvatar name={props.name} size={32} fontSize={'0.75rem'} />
					</div>
					<p className='text-sm font-sm text-gray-900'>{props.name}</p>
				</div>
			);
		};

		//Show only rooms with 2 players
		rooms = this.props.rooms.filter((room: any) => room.users.length === 2);

		if (rooms.length === 0) return <></>;

		return (
			<div className='text-center bg-lightpink'>
				<div className='mx-auto max-w-2xl py-2 px-4s sm:px-6 lg:max-w-7xl lg:px-8'>
					<div>
						<div className='flex gap-2'>
							<div className='live-icon mb-4'></div>
							<span className='text-sm text-white'>Live</span>
						</div>
						<Slider {...settings}>
							{rooms.map((item, i) => (
								<div key={i} className='card-live'>
									<div className='flex justify-center text-white gap-4'>
										<Player name={item.users[0].name} />
										<div>
											<p className='text-sm font-sm text-gray-900'>vs</p>
										</div>
										<Player name={item.users[1].name} />
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

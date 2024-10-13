import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper React components
import 'swiper/css'; // Import core Swiper styles
import 'swiper/css/autoplay'; // Import autoplay styles (if using Autoplay)
import Titles from '../Titles';
import {UsersData} from '../../Data/MovieData';

function MovieCasts() {
    return (
        <div className='my-12'>
            <Titles title="Casts" Icon={FaUsers} />
            <div className='mt-10'>
                <Swiper
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    spaceBetween={10}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        400: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5, spaceBetween: 30 },
                    }}
                >
                    {UsersData.map((user, i) => (
                        <SwiperSlide key={i}>
                            <div className='w-full p-3 italic text-xs text-teal-50 rounded flex-colo bg-dry border border-gray-800'>
                                <img src={user.image} alt={user.fullName} className='w-full h-64 object-cover rounded mb-4' />
                                <p>{user.fullName}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MovieCasts;
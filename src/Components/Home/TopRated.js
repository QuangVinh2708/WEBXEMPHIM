import React, { useState } from 'react';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Movies } from '../../Data/MovieData';
import Titles from '../Titles';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from './Stars';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function TopRated() {
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);

    return (
        <div className='my-16'>
            <Titles title='Top Rated' Icon={BsBookmarkStarFill} />
            <div className="mt-10">
                <Swiper
                    navigation={{ nextEl, prevEl }} 
                    slidesPerView={4} 
                    spaceBetween={40} 
                    autoplay={{ delay: 3000 }} 
                    speed={1000}
                    loop={true}
                    modules={[Navigation, Autoplay]}
                >
                    {
                        Movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden">
                                    <img 
                                        src={`${movie.titleImage}`}
                                        alt={movie.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="flex flex-col justify-center items-center gap-4 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                                        <button className="w-12 h-12 flex justify-center items-center rounded-full bg-white bg-opacity-30 text-white hover:bg-subMain transition-all duration-300">
                                            <FaHeart />
                                        </button>
                                        <Link 
                                            className="font-semibold text-xl text-white truncate w-full"
                                            to={`/movie/${movie.name}`}
                                        >
                                            {movie.name}
                                        </Link>
                                        <div className='flex justify-center gap-2 text-star'>
                                            <Rating value={movie.rate} />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default TopRated;

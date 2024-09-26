import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import PopularMovies from './PopularMovies';
import { Movies } from './../../Data/MovieData';
import FlexMovieItems from '../FlexMovieItems';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Banner() {
    return (
        <div className="relative w-full">
            <Swiper
                direction='vertical'
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full xl:h-96 bg-dry lg:h-64 h-48"
            >
                {Movies.slice(0, 6).map((movie, index) => (
                    <SwiperSlide key={index} className="relative rounded overflow-hidden">
                        <img
                            src={`${movie.image}`} // Ensure images are in public/images/movies/
                            alt={movie.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right=0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">

                            <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-blod">
                                {movie.name}
                            </h1>
                            <div className="flex gap-5 items-center text-dryGray">
                                <FlexMovieItems movie={movie} />
                            </div> 
                            <div className='flex gap-5 item-center'>
                                <Link
                                to={`/movie/${movie.name}`} 
                                className="bg-subMain hover:text-main transitions text white px-8 py-3 rounded font-medium sum:text-sm text-xs">
                                Watch 
                                </Link>
                                <button className='bg-main hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30'>
                                    <FaHeart/>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;

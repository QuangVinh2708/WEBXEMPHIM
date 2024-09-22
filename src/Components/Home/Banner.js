import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import PopularMovies from './PopularMovies';
import { Movies } from './../../Data/MovieData';

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
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right=0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;

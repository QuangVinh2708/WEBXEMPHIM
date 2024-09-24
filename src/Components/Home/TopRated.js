import React, {useState} from 'react';
import {BsBookmarkStarFill} from 'react-icons/bs';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper';
import {Movies} from '../../Data/MovieData';
import Titles from './Titles';

function TopRated() {
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevtEl] = useState(null);
    return(
        <div className='my-16'>
            <Titles title='Top Rated' Icon={BsBookmarkStarFill} />
            <div className="mt=10">
                <Swiper 
                navigation={{ nextEl, prevEl}} 
                slidesPerView={4} 
                spaceBetween={40} 
                autoplay={true} 
                speed={1000}
                loop={true}
                modules={[Navigation,Autoplay]}
                >
                    {
                        Movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className="p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden">
                                    <img 
                                    src={`/images/movies/${movie.ttileImage}`}
                                    alt={movie.name}
                                    className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    )
}
export default TopRated 
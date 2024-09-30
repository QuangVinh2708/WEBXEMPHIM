import React from 'react';

function MovieInfo(movie) {
    return (
        <div className='w-full xl:h-screen relative text-white'>
            <img 
                src={'/images/movies/${movie?.image}'} 
                alt={movie.name} 
                className='w-full hidden xl:inline-block h-full object-cover'
                />
            </div>
    )
}

export default MovieInfo;

import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Layout from "../Layout/Layout";
import MovieInfo from '../Components/Single/MovieInfo';
import { Movies } from '../Data/MovieData';
import MovieCasts from '../Components/Single/MovieCasts'
function SingleMovie() {
    const { id } = useParams(); // Get id from URL params
    const movie = Movies.find((movie) => movie.name === id); // Use appropriate comparison if id is a number

    return (
        <Layout>
            <MovieInfo movie={movie} />
            <div className='container mx-auto min-h-screen px-2 my-6'>
                <MovieCasts/>
            </div>
        </Layout>
    );
}

export default SingleMovie;

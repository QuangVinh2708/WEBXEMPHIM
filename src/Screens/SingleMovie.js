import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Layout from "../Layout/Layout";
import MovieInfo from '../Components/Single/MovieInfo';
import { Movies } from '../Data/MovieData';

function SingleMovie() {
    const { id } = useParams(); // Get id from URL params
    const movie = Movies.find((movie) => movie.id === parseInt(id)); // Use appropriate comparison if id is a number

    if (!movie) {
        return (
            <Layout>
                <div className="text-center text-red-500">Movie not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <MovieInfo movie={movie} />
        </Layout>
    );
}

export default SingleMovie;

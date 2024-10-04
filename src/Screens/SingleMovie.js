import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Layout from "../Layout/Layout";
import MovieInfo from '../Components/Single/MovieInfo';
import { Movies } from '../Data/MovieData';
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates';
import Titles from '../Components/Titles';
import Movie from '../Components/Movie';

function SingleMovie() {
    const { id } = useParams(); // Get id from URL params
    const movie = Movies.find((movie) => movie.name === id); // Use appropriate comparison if id is a number
    const RelatedMovies = Movies.filter(
        (m) => m.category === movie.category
    );

    return (
        <Layout>
            <MovieInfo movie={movie} />
            <div className='container mx-auto min-h-screen px-2 my-6'>
                <MovieCasts/>
                {/* rate */}
                <MovieRates movie={movie}/>
                {/* related */}
                <div className="my-16">
                    <Titles title="Related Movies" Icon={BsCollectionFill} />
                    <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                    {RelatedMovies.map((movie, index) => (
                        <Movie key={index} movie={movie} />
                    ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SingleMovie;

import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import PopularMovies from '../Components/Home/PopularMovies'
import Banner from '../Components/Home/Banner'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMovieAction } from '../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'


function HomeScreen() {
    const dispatch = useDispatch();
    // useSeclectors
    const { isLoading: randomLoading, isError:randomError, movies: randomMovies } = useSelector(
        (state) => state.getRandomMovies
    );
    const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(
        (state) => state.getTopRatedMovie
    );
    const { isLoading , isError, movies  } = useSelector(
        (state) => state.getRandomMovies
    );


    //useEffect
    useEffect(() => {
        // Get random movies
        dispatch(getRandomMoviesAction());
        // Get all movies
        dispatch(getAllMoviesAction({}));
        // Get top rated movies
        dispatch(getTopRatedMovieAction());
        
        // Errors
        if (isError || randomError || topError) {
            toast.error("Something went wrong!");
        }
    }, [dispatch, isError, randomError, topError]);
    

    return(
       <Layout>
        <div className="container mx-auto min-h-screen px-2 mb-6">
            <Banner movies={movies} isLoading={isLoading}/>
            <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
            <Promos />
            <TopRated movies={topMovies} isLoading={topLoading}/>
        </div>
       </Layout>
    )
}
export default HomeScreen
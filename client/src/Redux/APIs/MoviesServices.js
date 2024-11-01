import Axios from "./Axios";

// ************ PUBLIC APIs ************

// get all movies function
export const getAllMoviesService = async (
    category,
    time,
    language,
    rate,
    year,
    search,
    pageNumber,
) => {
    const { data } = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
    );
    return data;
};

// get random movies Function
export const getRandomMoviesService = async () => {
    const { data } = await Axios.get('/movies/random/all');
    return data;
};

// Get movie by id Function
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
};

// Get top rated movie Function
export const getTopRatedMovieService = async () => {
    const { data } = await Axios.get('/movies/rated/top');
    return data;
};


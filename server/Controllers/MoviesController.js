import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// ************* PUBLIC CONTROLLERS *************
// @desc import movies
// @route POST /api/movies/import
// @access Public

const importMovies = asyncHandler(async (req, res) => {
    // first we make sure our Movies table is empty by deleting all documents
    await Movie.deleteMany({});
    // then we insert all movies from MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

// @desc get all movies
// @route GET /api/movies
// @access Public

const getMovies = asyncHandler(async (req, res) => {
    try {
        // filter movies by category, time, language, rate, year and search
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        };

// load more movies functionality
const page = Number(req.query.pageNumber) || 1;
const limit = 2;
const skip = (page - 1) * limit;

// find movies by query, skip and limit
const movies = await Movie.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

// get total number of movies
const count = await Movie.countDocuments(query);

// send response with movies and total number of movies
res.json({ 
    movies, 
    page, 
    pages: Math.ceil(count / limit), 
    totalMovies: count
 });
} catch (error) {
  res.status(400).json({ message: error.message});   
    }
});

export { importMovies, getMovies };


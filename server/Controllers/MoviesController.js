import { Movies } from "../Data/MovieData.js";
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
    const movies = await Movie.insertMany(Movies);
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
        const page = Number(req.query.pageNumber) || 1;   // if pageNumber is not provided in query  we set it to 
        const limit = 2;
        const skip = (page - 1) * limit; // skip 2 movies per page 

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
            pages: Math.ceil(count / limit),  // total number of pages
            totalMovies: count,  // total number of movie
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc get movie by id 
// @route Get /api/movies/:id
// @access Public

const getMovieById = asyncHandler(async (req, res) => {
    try {
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // if the movie if found send it to the client
        if (movie) {
            res.json(movie);
        }
        // if the movie is not found send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// @desc get top rated movies
// @route get /api/movies/rated/top
// @access public

const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        // find top rated movies
        const movies = await Movie.find({}).sort({ rate: -1 });
        // send top rated movies to the client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// @desc Get random movies
// @route GET /api/movies/random
// @access Public

const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        // find random movies
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
        // send random movies to the client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Create movies review
// @route POST /api/movies/:id/reviews
// @access Private

const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    try {
        // Find the movie by ID
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            res.status(404);
            throw new Error("Movie not found");
        }

        // Check if the user has already reviewed this movie
        const alreadyReviewed = movie.reviews.find(
            (review) => review.userId.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("You already reviewed this movie");
        }

        // Create a new review object
        const review = {
            userName: req.user.fullName,
            userId: req.user._id,
            userImage: req.user.image,
            rating: Number(rating),
            comment,
        };

        // Add the new review to the reviews array
        movie.reviews.push(review);

        // Update the number of reviews
        movie.numberOfReviews = movie.reviews.length;

        // Recalculate the average rating
        movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

        // Save the updated movie in the database
        await movie.save();

        // Send a success message to the client
        res.status(201).json({
            message: "Review added successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { importMovies, getMovies, getMovieById, getTopRatedMovies,getRandomMovies,createMovieReview };
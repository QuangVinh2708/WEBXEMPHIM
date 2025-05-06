import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IfMovieLiked, LikeMovie } from '../Context/Functionnalities';

function Movie({ movie }) {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin);

  const isLiked = IfMovieLiked(movie);

  if (!movie) return null;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group transition-all duration-300 w-full h-80">
      <Link to={`/movie/${movie?._id}`} className="w-full h-full block">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img 
            src={movie?.image ? movie?.image : "/images/user.png"}
            alt={movie?.name} 
            className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="absolute flex justify-between items-center bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 rounded-lg">
        <h3 className="font-semibold text-xl text-white truncate w-3/4">{movie.name}</h3>
        <button 
          onClick={() => LikeMovie(movie, dispatch, userInfo)}
          disabled={isLiked || isLoading}
          className={`h-10 w-10 flex items-center justify-center rounded-full border-2 transition-all 
            ${isLiked ? "border-transparent bg-transparent text-white" : "border-white bg-red-600 text-white hover:bg-red-700"}`}>
          <FaHeart />
        </button>
      </div>
    </div>
  );
}

export default Movie;

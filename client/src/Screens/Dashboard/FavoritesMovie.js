import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Table from '../../Components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavouriteMoviesAction, getFavouriteMoviesAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
import Loader from '../../Components/Notfications/Loader';
import { Empty } from '../../Components/Notfications/Empty';

function FavoritesMovies() {
    const dispatch = useDispatch();

    const { isLoading, isError, likedMovies = [] } = useSelector(
        state => state.userGetFavouriteMovies
    );

    // delete
    const {
        isLoading: deleteLoading, 
        isError: deleteError,
        isSuccess,
    } = useSelector(
        state => state.userDeleteFavouriteMovies
    );

    // delete movies handler
    const deleteMoviesHandler = () => {
        window.confirm("Are you sure you want to delete all movies?") &&
        dispatch(deleteFavouriteMoviesAction());
    };

    // useEffect
    useEffect(() => {
        dispatch(getFavouriteMoviesAction());
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({type: isError ? "GET_FAVOURITE_MOVIES_RESET" : "DELETE_FAVOURITE_MOVIES_RESET"});
        }
    }, [dispatch, isError, deleteError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Favorites Movies</h2>
                    {
                        likedMovies.length > 0 &&
                        <button
                            disabled={deleteLoading}
                            onClick={deleteMoviesHandler}
                            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
                            { deleteLoading ? "Deleting..." : "Delete All" }
                        </button>
                    }
                </div>
                {
                    isLoading ? (
                        <Loader />
                    ) : likedMovies.length > 0 ? (
                        <Table data={likedMovies} admin={false} />
                    ) : (
                        <Empty message="You have no favourite movies" />
                    )
                }
            </div>
        </SideBar>
    );
}

export default FavoritesMovies;
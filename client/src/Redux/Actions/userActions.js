import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";

import { ErrorsAction, tokenProtection } from "../Protection";
import { toast } from "react-toastify";

// login action
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });

        const response = await userApi.loginService(datas);

        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL)
    }
};
// register action
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });

        const response = await userApi.registerService(datas);

        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response }); // Đăng nhập ngay sau khi đăng ký thành công
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

// logout action
const logoutAction = () => (dispatch) => {
    userApi.logoutService();

    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
};

const updateProfileAction = (user) => async (dispatch ,getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userApi.updateProfileService(user,tokenProtection(getState));
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: response,
        });
        toast.success("Profile Updated");
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        
        await userApi.deleteProfileService(tokenProtection(getState));
        
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
        toast.success("Profile Deleted");
        
        dispatch(loginAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
};

// change pasword action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST});
        const respone = await userApi.changePasswordService(
            passwords,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
            payload: respone,
        });
    } catch (error) {
        ErrorsAction( error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
}

// get all favourite movies action 
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVOURITE_MOVIES_REQUEST});
        const respone = await userApi.getFavouriteMovies(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.GET_FAVOURITE_MOVIES_SUCCESS,
            payload: respone,
        });
    } catch (error) {
        ErrorsAction( error, dispatch, userConstants.GET_FAVOURITE_MOVIES_FAIL);
    }
};

// delete all favourite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVOURITE_MOVIES_REQUEST});
            await userApi.deleteFavoriteMovies(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.DELETE_FAVOURITE_MOVIES_SUCCESS,
        });
        toast.success("Favourite Movies Deleted");
    } catch (error) {
        ErrorsAction( error, dispatch, userConstants.DELETE_FAVOURITE_MOVIES_FAIL);
    }
};

// admin get all user action 
const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST});
        const respone = await userApi.getAllUserService(tokenProtection(getState));
        dispatch({
            type: userConstants.GET_ALL_USERS_SUCCESS,
            payload: respone,
        });
    }catch(error){
        ErrorsAction( error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

// admin delete user action 
const deleteUsersAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USERS_REQUEST});
        await userApi.deleteUserService(id,tokenProtection(getState));
        dispatch({
            type: userConstants.DELETE_USERS_SUCCESS,
        });
        toast.success("User Deleted");
    }catch(error){
        ErrorsAction( error, dispatch, userConstants.DELETE_USERS_FAIL);
    }
};

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
      const response = await userApi.likeMovieService(
        movieId,
        tokenProtection(getState)
      );
      dispatch({
        type: userConstants.LIKE_MOVIE_SUCCESS,
        payload: response,
      });
      toast.success("Added to your favorites");
      dispatch(getFavoriteMoviesAction());
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
  };
  
export { 
    loginAction, 
    registerAction, 
    logoutAction,
    updateProfileAction,
    deleteProfileAction,
    changePasswordAction,
    getFavoriteMoviesAction,
    deleteFavoriteMoviesAction,
    getAllUsersAction,
    deleteUsersAction,
    likeMovieAction
};


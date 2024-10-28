import * as userConstants from '../Constants/userConstants'

// lOGIN
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case userConstants.USER_LOGIN_REQUEST:
        return { isLoading: true };
        
      case userConstants.USER_LOGIN_SUCCESS:
        return { isLoading: false, userInfo: action.payload, isSuccess: true };
        
      case userConstants.USER_LOGIN_FAIL:
        return { isLoading: false, isError: action.payload };
        
      case userConstants.USER_LOGIN_RESET:
        return {};
        
      case userConstants.USER_LOGOUT:
        return {};
        
      default:
        return state;
    }
  };
  
  // RESISTER
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case userConstants.USER_REGISTER_REQUEST:
        return { isLoading: true };
        
      case userConstants.USER_REGISTER_SUCCESS:
        return { isLoading: false, userInfo: action.payload, isSuccess: true };
        
      case userConstants.USER_REGISTER_FAIL:
        return { isLoading: false, isError: action.payload };
        
      case userConstants.USER_REGISTER_RESET:
        return {};
        
      default:
        return state;
    }
  };

  // UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
      case userConstants.USER_UPDATE_PROFILE_REQUEST:
          return { isLoading: true };
      case userConstants.USER_UPDATE_PROFILE_SUCCESS:
          return { isLoading: false, userInfo: action.payload, isSuccess: true };
      case userConstants.USER_UPDATE_PROFILE_FAIL:
          return { isLoading: false, isError: action.payload };
      case userConstants.USER_UPDATE_PROFILE_RESET:
          return {};
      default:
          return state;
  }
}

// DELETE PROFILE
export const userDeleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
      case userConstants.USER_DELETE_PROFILE_REQUEST:
          return { isLoading: true };

      case userConstants.USER_DELETE_PROFILE_SUCCESS:
          return { isLoading: false, isSuccess: true };

      case userConstants.USER_DELETE_PROFILE_FAIL:
          return { isLoading: false, isError: action.payload };

      case userConstants.USER_DELETE_PROFILE_RESET:
          return {};

      default:
          return state;
  }
};

// CHANGE PASSWORD
export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_PASSWORD_REQUEST:
        return { isLoading: true };
    case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
        return { 
          isLoading: false, 
          isSuccess: true, 
          message: action.payload.message, 
        };
    case userConstants.USER_CHANGE_PASSWORD_FAIL:
        return { isLoading: false, isError: action.payload };
    case userConstants.USER_CHANGE_PASSWORD_RESET:
        return {};
    default:
        return state;
}
};


// GET FAVOURITE MOVIES
export const userGetFavouriteMoviesReducer = (state = {
  likedMovies: [],
}, action) => {
  switch (action.type) {
    case userConstants.GET_FAVOURITE_MOVIES_REQUEST:
        return { isLoading: true };
    case userConstants.GET_FAVOURITE_MOVIES_SUCCESS:
        return { isLoading: false, likedMovies: action.payload };
    case userConstants.GET_FAVOURITE_MOVIES_FAIL:
        return { isLoading: false, isError: action.payload };
    case userConstants.GET_FAVOURITE_MOVIES_RESET:
        return {};
    default:
        return state;
}
};

// DELETE FAVOURITE MOVIES 
export const userDeleteFavouriteMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_FAVOURITE_MOVIES_REQUEST:
        return { isLoading: true };
    case userConstants.DELETE_FAVOURITE_MOVIES_SUCCESS:
        return { isLoading: false, isSuccess: true };
    case userConstants.DELETE_FAVOURITE_MOVIES_FAIL:
        return { isLoading: false, isError: action.payload };
    case userConstants.DELETE_FAVOURITE_MOVIES_RESET:
        return {};
    default:
        return state;
}
};
  
// ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST:
        return { isLoading: true };
    case userConstants.GET_ALL_USERS_SUCCESS:
        return { isLoading: false, users: action.payload };
    case userConstants.GET_ALL_USERS_FAIL:
        return { isLoading: false, isError: action.payload };
    case userConstants.GET_ALL_USERS_RESET:
        return {
          users: [],
        };
    default:
        return state;
}
};

// ADMIN DELETE USER
export const adminDeleteUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_USERS_REQUEST:
        return { isLoading: true };
    case userConstants.DELETE_USERS_SUCCESS:
        return { isLoading: false, isSuccess: true };
    case userConstants.DELETE_USERS_FAIL:
        return { isLoading: false, isError: action.payload };
    case userConstants.DELETE_USERS_RESET:
        return {};
    default:
        return state;
}
};
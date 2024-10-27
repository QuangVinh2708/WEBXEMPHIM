import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from './Reducers/userReducers'
// import { userInfo } from "os";
const rootReducer = combineReducers({
  // user reducers
  userLogin :User.userLoginReducer,
  userRegister : User.userRegisterReducer,
  userUpdateProfile:User.userUpdateProfileReducer,
  userDeleteProfile:User.userDeleteProfileReducer
});
 // get userInfo from localStorage
 const userInfoFromStorage =localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    :null;

 // initialState
const initialState = {
  userLogin : {userInfo : userInfoFromStorage},
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

/**
 * @flow
 */

import { loginFormConstants } from "../constants";
import type {LoginFormStateType} from "../types/state/LoginFormStateType";
import type {UserType} from "../types/common/UserType";
import type {LoginFormActionType} from "../types/action/LoginFormActionType";


// Initialise the redux store
// Check if the local storage already has a user saved, otherwise start fresh.
const userstring: ?string = (localStorage.getItem("user"): ?string);
var initialState: LoginFormStateType;

if (userstring) {
    const jsonUser = (JSON.parse(userstring): UserType);
    const user: UserType = jsonUser;
    initialState = {   
        user: user, 
        loggedIn: true, 
        loggingIn: false, 
        error: "",
        currentUserName: "",
        currentPassword: "",
        submitted: false
    };
} else {
    initialState = {
        user: null,   
        loggedIn: false,
        loggingIn: false,
        error: "",
        currentUserName: "",
        currentPassword: "",
        submitted: false
    };
}


export function loginForm(state: any = initialState, action: LoginFormActionType): LoginFormStateType {
  switch (action.type) {
    case loginFormConstants.SET_PASSWORD:
      return {
        ...state,
        currentPassword: action.password
      };
      case loginFormConstants.SET_SUBMITTED:
      return {
        ...state,
        submitted: action.submitted
      };

      case loginFormConstants.SET_USERNAME:
      return {
        ...state,
        currentUserName: action.username
      };
      case loginFormConstants.LOGIN_REQUEST:
      return {
        ...state,
          user: action.user,
          loggedIn: false,
          loggingIn: true,
          error: "",
          currentUserName: "",
          currentPassword: ""
      };
  case loginFormConstants.LOGIN_SUCCESS:
      return {
        ...state,
          user: action.user,
          loggedIn: true,
          loggingIn: false,
          error: ""
      };
  case loginFormConstants.LOGIN_FAILURE:
      return {
        ...state,
          user: null,
          loggedIn: false,
          loggingIn: false,
          error: action.error
      };
  case loginFormConstants.LOGOUT:
      return {
        ...state,
          user: null,
          loggedIn: false,
          loggingIn: false,
          error: ""
      };
    default:
      return state;
  }
}

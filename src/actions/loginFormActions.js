/**
 * @flow
 */
import { loginFormConstants } from '../constants';
import { loginService } from '../services';
import { applicationHistory } from '../helpers';
import type {UserType} from "../types/common/UserType";

export const loginFormActions = {
    setUserName,
    setPassword,
    setSubmitted,
    login,
    logout
};


function setUserName(username: string) {
    return (dispatch: any) => {
        dispatch(go(username));
    };

    function go(username: string) { 
        return { 
            type: loginFormConstants.SET_USERNAME,
            username: username
        } 
    }
}


function setPassword(password: string) {
    return (dispatch: any) => {
        dispatch(go(password));
    };

    function go(password: string) { 
        return { 
            type: loginFormConstants.SET_PASSWORD,
            password: password
        } 
    }
}


function setSubmitted(value: boolean) {
    return (dispatch: any) => {
        dispatch(go(value));
    };

    function go(value: boolean) { 
        return { 
            type: loginFormConstants.SET_SUBMITTED,
            submitted: value
        } 
    }
}

function login(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ username }));

        loginService.login(username, password)
            .then(
                (user: UserType) => { 
                    dispatch(success(user));
                    applicationHistory.push('/');
                },
                (error: any) => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user: {username: string}) { return { type: loginFormConstants.LOGIN_REQUEST, user } }
    function success(user: UserType) { return { type: loginFormConstants.LOGIN_SUCCESS, user } }
    function failure(error: any) { return { type: loginFormConstants.LOGIN_FAILURE, error } }
}

function logout() {
    loginService.logout();
    return { 
        type: loginFormConstants.LOGOUT };
}
/**
 * @flow
 */

import type {UserType} from "../types/common/UserType";


export const loginService = {
    login: fakeLogin,
    logout
};

  function fakeLogin(username: string, password: string) {

    var p: Promise<any> =
     new Promise((resolve: any, x: any) => {
        setTimeout(() => {
          const user: UserType = { user: username, token: "fake token"};
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        }, 1000);
      });

      return p;
}

function logout() {
    localStorage.removeItem('user');
}

function realLoginExample(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('www.mywebsite.com/login', requestOptions)
        .then(handleResponse, handleError)
        .then((user: any) => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function handleResponse(response: any) {
    return new Promise((resolve: any, reject: any) => {
        if (response.ok) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then((json: any) => resolve(json));
            } else {
                resolve();
            }
        } else {
            response.text().then((text: string) => reject(text));
        }
    });
}

function handleError(error: any) {
    return Promise.reject(error && error.message);
}
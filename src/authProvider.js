import { AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin';

export const ACCESS_TOKEN = 'accessToken';

export default (type, params) => {
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem(ACCESS_TOKEN);
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem(ACCESS_TOKEN) ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unkown method');
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: process.env.REACT_APP_SECURITY_API_URL + "/user/me",
        method: 'GET'
    });
}

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};
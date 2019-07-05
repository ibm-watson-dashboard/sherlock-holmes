import { fetchUtils } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider from 'ra-data-simple-rest';

const ACCESS_TOKEN = 'accessToken';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers();
    }
    options.headers.set('Accept', 'application/json');
    options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');
    options.headers.set('X-Total-Count', 99);
    options.headers.set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    return fetchUtils.fetchJson(url, options);
}

const restProvider = simpleRestProvider('http://localhost:8080', httpClient);

const superDataProvider = (type, resource, params) => {
    return restProvider(type, resource, params)
}

export default superDataProvider;
    
// export default (type, resource, params) => {
//     new Promise(resolve =>
//         setTimeout(resolve(restProvider(type, resource, params)), 1000)
//     );
// }
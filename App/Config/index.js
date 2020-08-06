import {create} from 'apisauce';

// const SERVER_URL = 'http://localhost:5000';
const SERVER_URL = "https://wheels-server.herokuapp.com";

const API_URL = SERVER_URL + '/api'
const ApiClient = create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    // timeout: 10 * 1000,
})

export const Config = {
    SERVER_URL,
    API_URL,
    ApiClient
}

import { Config } from '../Config';

let {ApiClient} = Config


let fulfilled = (response) => response;

function isUserRegistered(email) {
    return ApiClient.get(`/isUserRegistered?email=${email}`)
    .then(fulfilled)
}

function createUser(newUser) {
    return ApiClient.post(`/createUser`, newUser).then(fulfilled)
}

function getProfile(payload) {
    return ApiClient.get(`/getEmployee?uid=${payload.uid}`).then(fulfilled)
}

function updateUser(payload) {
    return ApiClient.post(`/updateUser`, payload).then(fulfilled)
}

function addPhotograph(payload) {
    return ApiClient.post(`/addPhotograph`, payload).then(fulfilled)
}

function getGallery(payload) {
    return ApiClient.get(`/getGallery?uid=${payload.uid}`).then(fulfilled)
}

function addToJournal(payload) {
    return ApiClient.post(`/addToJournal`, payload).then(fulfilled)
}

export default {
    isUserRegistered,
    createUser,
    getProfile,
    updateUser,
    addPhotograph,
    getGallery,
    addToJournal
}

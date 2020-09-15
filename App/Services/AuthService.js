
import { Config } from '../Config';

let {ApiClient} = Config


let fulfilled = (response) => response;

function isUserRegistered(email) {
    return ApiClient.get(`/isUserRegistered?email=${email}`)
    .then(fulfilled)
}

function createProfile(newUser) {
    return ApiClient.post(`/createProfile`, newUser).then(fulfilled)
}

function getProfile(payload) {
    return ApiClient.get(`/getProfile?uid=${payload.uid}`).then(fulfilled)
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
    createProfile,
    getProfile,
    updateUser,
    addPhotograph,
    getGallery,
    addToJournal
}

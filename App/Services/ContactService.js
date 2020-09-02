
import { Config } from '../Config';

let {ApiClient} = Config


let fulfilled = (response) => response;

function sendMessage(payload) {
    return ApiClient.post(`/sendMessage`, payload).then(fulfilled)
}

export default {
    sendMessage
}

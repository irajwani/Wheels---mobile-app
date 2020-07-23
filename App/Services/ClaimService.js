import {Config} from '../Config';

let {ApiClient} = Config;

let fulfilled = (response) => response;

function createClaim(newUser) {
  return ApiClient.post('/createClaim', newUser).then(fulfilled);
}

function getClaims(payload) {
  return ApiClient.get(`/getEmployeeClaims?uid=${payload.uid}`).then(fulfilled);
}

export default {
  createClaim,
  getClaims,
};

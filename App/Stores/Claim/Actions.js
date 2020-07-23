import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  createClaimRequest: ['payload'],
  createClaimSuccess: ['message'],
  createClaimFailure: ['errorMessage'],

  getClaimsRequest: ['payload'],
  getClaimsSuccess: ['message'],
  getClaimsFailure: ['errorMessage'],
});

export const ClaimTypes = Types;
export default Creators;

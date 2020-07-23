import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  createListingRequest: ['payload'],
  createListingSuccess: ['message'],
  createListingFailure: ['errorMessage'],

  getUsersRequest: ['payload'],
  getUsersSuccess: ['message'],
  getUsersFailure: ['errorMessage'],

  createPostRequest: ['payload'],
  createPostSuccess: ['message'],
  createPostFailure: ['errorMessage'],

})

export const ListingTypes = Types
export default Creators

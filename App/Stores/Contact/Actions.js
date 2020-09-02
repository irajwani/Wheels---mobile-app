import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({

  sendMessagefRequest: ['payload'],
  sendMessageSuccess: ['message'],
  sendMessageFailure: ['errorMessage'],

  
});

export const ContactTypes = Types;
export default Creators;

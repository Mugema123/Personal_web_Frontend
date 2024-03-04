import * as actionType from '../constants/actionTypes';

const initialState = {
  errors: null,
  authData: null,
  presentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH:

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGIN:
    return {
      errors: null,
      presentUser: {...action.payload.presentUser},
      userToken: action.payload.userToken,
    };

    case actionType.REGISTER:
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.FETCH__USER:
      return {
        errors: null,
        presentUser: {...action.payload.presentUser},
      };

    case actionType.GET_APPLICATION:
      return {
        errors: null,
        application: [...action.payload.application],
      };

    case actionType.FORGOT_PASSWORD:

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.NEW_PASSWORD:

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      return {
        errors: null,
        presentUser: null,  
      };

    case actionType.CERTIFICATE_MESSAGE_DISPLAYED:
      return {
          ...state, errors: null, certificateMessage: action.payload.certificateMessage
      };
      
    default:
      return state;
  }
};

export default authReducer;
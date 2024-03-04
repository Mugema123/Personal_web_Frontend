import { AUTH, LOGIN, REGISTER, LOGOUT, FORGOT_PASSWORD, NEW_PASSWORD, FETCH__USER } from '../constants/actionTypes';
import { API } from '../api';
import Keys from '../constants/keys';
import { signUp, signIn, loggedInUser, logoutUser, googleAuth, forgotPassword, newPassword, updateUser } from '../api';

export const signup = (formData) => async (dispatch) => {
    try {
      const { data } = await signUp(formData);

      dispatch({ type: REGISTER, data });
    
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
          } else {
            return 'Something went wrong. Please try again!';
        }
    }
};
  
export const signin = (formData, router) => async (dispatch) => {
  try {
    const  result  = await signIn(formData);

    dispatch({
      type: LOGIN,
      payload: {
        presentUser: result.data.result,
        userToken: result.data.Access_Token,
      },
    });
    localStorage.setItem('loggedInUser', JSON.stringify(result?.data));
    const link = localStorage.getItem(Keys.REDIRECT_URL_KEY);
    if (link) {
      localStorage.removeItem(Keys.REDIRECT_URL_KEY);
      router(link);
    } else {
      router('/');
    }

  } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return 'Something went wrong. Please try again!';
        }
  }
};

export const getLoggedInUser = () => {
  return async dispatch => {
    try {
      const result = await loggedInUser();
      if (!result.data.loggedInUser) {
        throw new Error('Failed to fetch the logged In User');
      }
      dispatch({
        type: FETCH__USER,
        payload: {
          presentUser: result.data.loggedInUser,
        },
      });   
    } catch (error) {
      if(error){
        // console.log('User not logged In');
      }
      
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      const result = await logoutUser();
      dispatch({
        type: LOGOUT,
        payload: {
          presentUser: result.data.successMessage,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };
};
  
export const googleauth = (formData, router) => async (dispatch) => {
  try {
    const result = await googleAuth(formData);

    dispatch({
      type: LOGIN,
      payload: {
        presentUser: result.data.result,
      },
    });
    localStorage.setItem('loggedInUser', JSON.stringify(result?.data));
    const link = localStorage.getItem(Keys.REDIRECT_URL_KEY);
    if (link) {
      localStorage.removeItem(Keys.REDIRECT_URL_KEY);
      router(link);
    } else {
      router('/');
    }
    
  } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return 'Something went wrong. Please try again!';
        }
  }
};

export const forgotpassword = (formData) => async (dispatch) => {
  try {
    const { data } = await forgotPassword(formData);

    localStorage.setItem('forgotPasswordToken', JSON.stringify(data?.resetPasswordToken));

    dispatch({ type: FORGOT_PASSWORD, data });
  
  } catch (error) {
      if (error.response && error.response.data) {
          return error.response.data;
        } else {
          return 'Something went wrong. Please try again!';
      }
  }
};

export const newpassword = (formData, router) => async (dispatch) => {
  try {
    const { data } = await newPassword(formData);

    dispatch({ type: NEW_PASSWORD, data });
    
    router('/login');
  
  } catch (error) {
      if (error.response && error.response.data) {
          return error.response.data;
        } else {
          return 'Something went wrong. Please try again!';
      }
  }
};

export const updateuser = (formData, router) => async (dispatch) => {
  try {
    const { data } = await updateUser(formData);

    dispatch({ type: AUTH, data });
    
    router('/profile');

    return data;
  
  } catch (error) {
      if (error.response && error.response.data) {
          return error.response.data;
        } else {
          return error;
      }  
  }
};


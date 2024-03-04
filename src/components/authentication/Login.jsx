import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './elements/TextField';
import SubmitButton from './elements/SubmitButton';
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { signin, googleauth } from '../../actions/auth';
import { toast } from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';

const initialState = { email: '', password: '' };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginMessageColor, setLoginMessageColor] =
    useState('text-black');
  const user = useSelector(state => state.auth.presentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleButtonLoading, setIsGoogleButtonLoading] =
    useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const errorMessage = await dispatch(signin(formData, navigate));

    if (errorMessage.invalidEmail) {
      setLoginMessage(errorMessage.invalidEmail);
      setLoginMessageColor('text-red-500');
      toast.error('Login was unsuccessful');
      setIsLoading(false);
    } else if (errorMessage.invalidPassword) {
      setLoginMessage(errorMessage.invalidPassword);
      setLoginMessageColor('text-red-500');
      toast.error('Login was unsuccessful');
      setIsLoading(false);
    } else {
      setLoginMessage(
        'Something went wrong, load your page and try again!',
      );
      setLoginMessageColor('text-red-500');
      toast.error('Login was unsuccessful');
      setIsLoading(false);
    }
  };

  const googleSuccess = async response => {
    setIsGoogleButtonLoading(true);
    const result = jwtDecode(response.credential);
    try {
      dispatch(googleauth(result, navigate)).then(response =>
        toast.error(response),
      );
      localStorage.setItem('IsGoogleUser', true);
    } catch (error) {
      toast.error(error);
    }
  };

  const googleFailure = error => {
    toast.error('Login was unsuccessful');
  };

  return (
    <div className='md:w-[50%] mx-5 md:mx-auto border border-white rounded-xl mt-28 mb-16'>
      <div className="w-full p-12">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="flex items-center space-x-2 my-8">
          <div className="h-1.5 w-1/5 bg-cyan-600"></div>
          <p className="text-blue font-semibold">Sign in with</p>
        </div>
        <div className="space-y-4 w-full flex justify-center items-center md:space-y-0 mb-10">
          {isGoogleButtonLoading ? (
            <PulseLoader
              color="#000000"
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GoogleLogin
                onSuccess={googleSuccess}
                onError={googleFailure}
                useOneTap
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          )}
        </div>
        <div className="flex items-center text-xs space-x-2 px-16 mb-10">
          <div className="h-[1px] rounded-full w-full bg-slate-400"></div>
          <span>Or</span>
          <div className="h-[1px] rounded-full w-full bg-slate-400"></div>
        </div>
        <TextField
          type="email"
          hint="Enter your email address"
          label="Email"
          fieldName="email"
          handleChange={handleChange}
        />
        <TextField
          type="password"
          hint="Enter your password"
          label="Password"
          fieldName="password"
          handleChange={handleChange}
        />
        <div className="text-sm flex space-x-2 my-4">
          <Link
            to="/forgotPassword"
            className="text-green font-bold underline"
          >
            Forgot Password?
          </Link>
        </div>
        {loginMessage && (
          <div
            className={`${loginMessageColor} mt-4 -mb-4 font-bold`}
          >
            {loginMessage}
          </div>
        )}
        <SubmitButton
          text={
            isLoading ? (
              <PulseLoader
                color="#ffffff"
                loading={true}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Sign In'
            )
          }
          handelSubmit={handelSubmit}
        />
        <div className="text-sm flex space-x-2 my-4">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-blue underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

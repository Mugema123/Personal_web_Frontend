import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './elements/TextField';
import SubmitButton from './elements/SubmitButton';
import { signup } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import PulseLoader from "react-spinners/PulseLoader";

const initialState = { firstName: '', lastName: '', email: '', password: '', repeatPassword: '' };

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpMessage, setSignUpMessage] = useState('');
  const [signUpMessageColor, setSignUpMessageColor] = useState('text-black');
  const user = useSelector(state => state.auth.presentUser);
  const [isLoading, setIsLoading ] = useState(false)

  if (user != undefined) {
    navigate('/')
  } 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handelSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    const errorMessage = await dispatch(signup(formData));

    if (errorMessage === undefined) {
      setSignUpMessage("Account created successfully, Check your email to verify this account!");
      setSignUpMessageColor('text-green-800')
      toast.success(`${formData.firstName} ${formData.lastName} is registered successfully`)
      setIsLoading(false)
    }
    else if (errorMessage.validationError) {
      setSignUpMessage(errorMessage.validationError);
      setSignUpMessageColor('text-red-500')
      toast.error('Account creation was unsuccessful')
      setIsLoading(false)
    }
    else if (errorMessage.duplicateError) {
      setSignUpMessage(errorMessage.duplicateError);
      setSignUpMessageColor('text-red-500')
      toast.error('Account creation was unsuccessful')
      setIsLoading(false)
    }
    else {
      setSignUpMessage('Something went wrong, load your page and try again!');
      setSignUpMessageColor('text-red-500')
      toast.error('Account creation was unsuccessful')
      setIsLoading(false)
    }
  }

  return (
    <div className='md:w-[50%] mx-5 md:mx-auto border border-white rounded-xl mt-28 mb-16'>
      <div className="w-full p-12">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <div className="flex items-center space-x-2 my-8">
          <div className="h-1.5 w-1/5 bg-cyan-600"></div>
        </div>
        <div className="flex space-y-4 md:space-y-0 md:space-x-4 mb-10 flex-col md:flex-row">
        </div>
        <div className="flex md:space-x-4 md:flex-row flex-col">
          <TextField
            type="text"
            hint="Enter your first name"
            label="First Name"
            fieldName="firstName"
            handleChange={handleChange}
          />
          <TextField
            type="text"
            hint="Enter your last name"
            label="Last Name"
            fieldName="lastName"
            handleChange={handleChange}
          />
        </div>
        <TextField
          type="email"
          hint="Enter your email address"
          label="Email"
          fieldName="email"
          handleChange={handleChange}
        />
        <TextField
          type='password'
          hint="Enter your password"
          label="Password"
          fieldName="password"
          handleChange={handleChange}
        />
        <TextField
          type='password'
          hint="Re-enter your password"
          label="Repeat Password"
          fieldName="repeatPassword"
          handleChange={handleChange}
        />
        {signUpMessage && (<div className={`${signUpMessageColor} mt-4 -mb-4 font-bold`}>{signUpMessage}</div>)}
        <SubmitButton text={isLoading ?        
        <PulseLoader
          color="#ffffff"
          loading={true}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> : 'Sign Up'} handelSubmit={handelSubmit}/>
        <div className="text-sm flex space-x-2 my-4">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

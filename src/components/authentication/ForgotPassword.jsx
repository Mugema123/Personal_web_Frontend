import React, { useState, useEffect } from "react";
import TextField from "./elements/TextField";
import SubmitButton from "./elements/SubmitButton";
import { forgotpassword } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const initialState = { email: "" };

export const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetMessage, setResetMessage] = useState("");
  const [resetMessageColor, setResetMessageColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.presentUser);

  if (user != undefined) {
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errorMessage = await dispatch(forgotpassword(formData));

    if (errorMessage === undefined) {
      setResetMessage("Please check your email to reset your password!");
      setResetMessageColor("text-green-800");
      setIsLoading(false);
    } else if (errorMessage.validationError) {
      setResetMessage(errorMessage.validationError);
      setResetMessageColor("text-red-500");
      setIsLoading(false);
    } else if (errorMessage.invalidEmail) {
      setResetMessage(errorMessage.invalidEmail);
      setResetMessageColor("text-red-500");
      setIsLoading(false);
    } else if (errorMessage.unverifiedEmail) {
      setResetMessage(errorMessage.unverifiedEmail);
      setResetMessageColor("text-red-500");
      setIsLoading(false);
    } else {
      setResetMessage("Something went wrong, load your page and try again!");
      setResetMessageColor("text-red-500");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="md:w-[50%] mx-5 md:mx-auto border border-white rounded-xl mt-28 mb-16">
        <div className="w-full p-12">
          <h1 className="text-3xl font-bold">Change Password</h1>
          <div className="flex items-center space-x-2 my-8">
            <div className="h-1.5 w-1/5 bg-cyan-600"></div>
          </div>
          <div className="flex items-center text-xs space-x-2 px-16 mb-10"></div>
          <TextField
            type="email"
            hint="Enter your email address"
            label="Email"
            fieldName="email"
            handleChange={handleChange}
          />
          {resetMessage && (
            <div className={`${resetMessageColor} mt-5 -mb-4 font-bold`}>
              {resetMessage}
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
                "Reset Password"
              )
            }
            handelSubmit={handleResetPassword}
          />
        </div>
      </div>
    </div>
  );
};

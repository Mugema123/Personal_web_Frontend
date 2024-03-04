import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "./elements/TextField";
import SubmitButton from "./elements/SubmitButton";
import { newpassword } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

const initialState = { password: "", repeatPassword: "" };

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageColor, setNewMessageColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.presentUser);

  if (user != undefined) {
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errorMessage = await dispatch(newpassword(formData, navigate));

    if (errorMessage.validationError) {
      setNewMessage(errorMessage.validationError);
      setNewMessageColor("text-red-500");
      setIsLoading(false);
    } else if (errorMessage.tokenError) {
      setNewMessage(errorMessage.tokenError);
      setNewMessageColor("text-red-500");
      setIsLoading(false);
    } else {
      setNewMessage("Something went wrong, load your page and try again!");
      setNewMessageColor("text-red-500");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="md:w-[50%] mx-5 md:mx-auto border border-white rounded-xl mt-28 mb-16">
        <div className="w-full p-12">
          <h1 className="text-3xl font-bold">New Password</h1>
          <div className="flex items-center space-x-2 my-8">
            <div className="h-1.5 w-1/5 bg-cyan-600"></div>
          </div>
          <div className="flex items-center text-xs space-x-2 px-16 mb-10"></div>
          <TextField
            type="password"
            handleChange={handleChange}
            hint="Enter your password"
            label="Password"
            fieldName="password"
          />
          <TextField
            type="password"
            handleChange={handleChange}
            hint="Re-enter your password"
            label="Repeat Password"
            fieldName="repeatPassword"
          />
          {newMessage && (
            <div className={`${newMessageColor} mt-5 -mb-4 font-bold`}>
              {newMessage}
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
            handelSubmit={handleNewPassword}
          />
        </div>
      </div>
    </div>
  );
};

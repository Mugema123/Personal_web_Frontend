import React from "react";
import { NavLink } from "react-router-dom";
import checkImage from "../../assets/images/successLogo.png";

export const EmailVerified = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-10 border border-gray-300 justify-center my-20 mx-auto w-[90%] md:w-[50%] lg:w-[30%] p-10 rounded-xl">
        <div className="w-28 mx-auto">
          <img src={checkImage} alt="" className="w-full" />
        </div>
        <h4 className="text-center text-lg">Email verified successfully!</h4>
        <p className="text-center text-lg">
          You can now{" "}
          <NavLink to="/login" className="text-green font-bold underline">
            login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import PulseLoader from "react-spinners/PulseLoader";

const UserProfile = ({ user, Logout, isLoading }) => {
    const [isShown, setIsShown] = useState(false);
    const [imageError, setImageError] = useState(false);
  return (
    <div>
      {user ? (
        <div className="relative">
          {user?.picture && !imageError ? (
            <div className="flex items-center gap-1">
              <img
                src={user?.picture.url}
                alt={user?.name}
                className="w-10 h-10 rounded-full hover:cursor-pointer"
                onMouseOver={() => setIsShown(true)}
                onMouseOut={() => setIsShown(false)}
                onError={() => setImageError(true)}
              />
              <div>
                <IoIosArrowDropdown />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <div
                className="bg-cyan-600 w-10 h-10 text-xl flex justify-center items-center text-white text-center rounded-full  hover:cursor-pointer"
                onMouseOver={() => setIsShown(true)}
                onMouseOut={() => setIsShown(false)}
              >
                {user?.firstName.charAt(0)}
              </div>
              <div>
                <IoIosArrowDropdown />
              </div>
            </div>
          )}

          <div
            className={`${
              isShown ? "visible" : "invisible"
            } bg-cyan-600 shadow-2xl absolute w-[150px] right-0  h-auto z-50`}
            onMouseOver={() => setIsShown(true)}
            onMouseOut={() => setIsShown(false)}
          >
            <div
              className="flex items-center text-white gap-2 py-3 bg-cyan-600 hover:cursor-pointer border-t uppercase font-bold pl-5"
              onClick={Logout}
            >
              <RiLogoutCircleLine className="font-bold text-lg" />{" "}
              {isLoading ? (
                <PulseLoader
                  color="#ffffff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Logout"
              )}
            </div>
          </div>
        </div>
      ) : (
        <li className="px-6 hover:text-cyan-600">
            <a href="/login">LOGIN</a>
        </li>
      )}
    </div>
  );
};

export default UserProfile;

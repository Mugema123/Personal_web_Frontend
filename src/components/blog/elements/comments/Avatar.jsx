import React from 'react';

import { FaUser } from 'react-icons/fa';
const Avatar = ({ color, letter, image }) => {
  return (
    <div
      className={`w-10 h-10 rounded-full ${
        color ? color : 'bg-cyan-600'
      } flex text-lg justify-center items-center text-white font-semibold overflow-hidden`}
    >
      {image ? (
        <img src={image} alt="avatar" className="w-10 h-10" />
      ) : letter ? (
        letter.toUpperCase()
      ) : (
        <FaUser />
      )}
    </div>
  );
};

export default Avatar;

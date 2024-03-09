import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const PopupModal = ({ title, show, onClose, children }) => {
  return (
    <div
      className={`fixed z-[9999999] md:pt-[10%] pt-[20%] left-0 top-[10%] w-full  backdrop-blur-[2px] h-full bg-[rgba(0,0,0,0.59)] ${
        show ? '' : 'hidden'
      }`}
    >
      <div className="mx-auto px-7 py-3 w-[85%] bg-cyan-600 rounded-lg md:w-[30%] ">
        <div className="flex justify-between border-b mb-4 pb-2 items-center">
          <h1 className="md:text-lg font-semibold">{title}</h1>
          <FaTimes
            className="text-lg text-white cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopupModal;

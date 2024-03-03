import React from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ onNext, activePage, onPrev, isLast }) => {
  return (
    <div className="flex justify-center items-center my-4 mt-12">
      <div
        className={`${
          activePage <= 1 ? 'bg-slate-400' : 'bg-green cursor-pointer'
        } rounded-full p-2.5 text-center text-sm mx-1 text-white`}
        onClick={activePage > 1 ? onPrev : null}
      >
        <FaArrowLeft />
      </div>
      {activePage > 1 && (
        <div
          className="bg-slate-400 cursor-pointer rounded-full px-2.5 py-1 text-center text-sm mx-1 text-white"
          onClick={onPrev}
        >
          {activePage - 1}
        </div>
      )}
      <div className="bg-green rounded-full px-2.5 py-1 text-center text-sm mx-1 text-white">
        {activePage}
      </div>
      {!isLast && (
        <div
          className="bg-slate-400 cursor-pointer rounded-full px-2.5 py-1 text-center text-sm mx-1 text-white"
          onClick={onNext}
        >
          {activePage + 1}
        </div>
      )}
      <div
        className={`${
          isLast ? 'bg-slate-400' : 'bg-green cursor-pointer'
        } rounded-full p-2.5 text-center text-sm mx-1 text-white`}
        onClick={isLast === false ? onNext : null}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Pagination;

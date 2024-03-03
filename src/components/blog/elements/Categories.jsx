import React from 'react';

const Categories = ({ active, onClick, categoriesData = [] }) => {
  return (
    <div className="w-full md:w-2/5 px-4 md:px-0" data-aos="fade-up">
      <h1 className="text-lg font-semibold">Categories</h1>
      <div className="">
        {categoriesData.map((category, index) => {
          return (
            <div
              key={category.slug}
              className={`${
                active === category.slug
                  ? 'bg-green text-white md:sticky top-16'
                  : ''
              } cursor-pointer shadow-lg text-center m-8 md:m-0 p-16 font-semibold text-slate-500 shadow-neutral-400 md:mt-4 rounded-lg hover:shadow-md`}
              onClick={() => onClick(category.slug)}
            >
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

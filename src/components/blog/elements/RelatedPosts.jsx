import React from 'react';
import { Link } from 'react-router-dom';

const RelatedPosts = ({ blogs, title }) => {
  return (
    <div className="shadow rounded-2xl mb-16 border-2 p-4 px-6">
      <div>
        <h1 className="text-lg font-bold text-center">
          {title.toUpperCase()}
        </h1>
      </div>
      <div className="mt-4">
        {blogs.length === 0 && (
          <div className="text-xs text-center text-slate-500 mb-4">
            There are no {title.toLowerCase()} recommended yet!
          </div>
        )}
        {blogs.map((blog, index) => {
          return (
            <Link to={`/blog/${blog.slug}`} key={index}>
              <div className="flex my-4 space-x-4 items-center">
                <div className="h-16 w-24">
                  <img
                    src={blog.postImage}
                    alt={blog.title}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex flex-col justify-center space-y-1">
                  <p className="text-sm text-cyan-600">
                    {blog.categoryDetails?.name?.toUpperCase()}
                  </p>
                  <p className="text-sm font-semibold hover:underline">
                    {blog.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;

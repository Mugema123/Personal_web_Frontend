import moment from 'moment';
import { Link } from 'react-router-dom';

const FeatureBlog = ({ blog }) => {
  return (
    <div className="relative md:mb-36">
      <div className="relative">
        <div className="h-[350px] md:h-[550px] overflow-hidden md:rounded-xl">
          <img
            src={blog.postImage}
            alt={blog.title}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="absolute w-full h-full bg-[#00000097] md:bg-[#0000005e] top-0 md:rounded-xl"></div>
      </div>
      <div className="flex flex-col items-start justify-evenly md:bg-white md:w-2/3 lg:w-1/2 rounded-xl p-6 shadow-lg mx-2 md:mx-12 absolute top-0 bottom-0 md:top-auto md:-bottom-20">
        <span className="bg-cyan-600 text-white text-xs px-2 py-1 rounded">
          {blog.categoryDetails?.name}
        </span>
        <h1 className="text-3xl md:font-semibold my-3 text-white md:text-black sm:leading-[45px] md:leading-[36px]">
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h1>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-12 h-12 bg-cyan-600 rounded-full flex justify-center items-center text-white">
            {blog.postCreator?.picture?.url ? (
              <img
                src={blog.postCreator?.picture?.url}
                alt={`${blog.postCreator?.name}`}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <h1 className="font-semibold text-xl">
                {blog.postCreator?.name[0]?.toUpperCase()}
              </h1>
            )}
          </div>
          <Link
            to={`/blog/author/${blog.postCreator?._id}`}
            className="font-bold text-slate-200 md:text-slate-500"
          >
            {`${blog.postCreator?.name}`}
          </Link>
          <span className="text-xs text-slate-400 pl-2 md:pl-4">
            / {moment(blog.createdAt).format('LL')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureBlog;

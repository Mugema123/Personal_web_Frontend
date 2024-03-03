import moment from 'moment';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { useNavigate, useLocation } from 'react-router-dom';

const Blogs = ({
  blogs = [],
  cols,
  setNewPage = page => {},
  pages = 1,
  page = 1,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const moveToPage = page => {
    setNewPage(page);
    navigate(`${location.pathname}?page=${page}`);
  };

  return (
    <div className="w-full">
      {blogs.length == 0 ? (
        <div className="text-center font-semibold text-xl">
          No more posts more available!
        </div>
      ) : (
        <>
          <div
            className={`grid md:${
              cols ? 'grid-cols-3' : 'grid-cols-2'
            } w-full px-4 md:px-0 gap-8 gap-y-7`}
          >
            {blogs.map((blog, index) => {
              return (
                <div
                  key={index}
                  className="border rounded-md p-2 md:px-3"
                  data-aos="fade-up"
                >
                  <div className="mb-3 h-48">
                    <img
                      src={blog.postImage}
                      alt={blog.title}
                      className="rounded object-cover h-full w-full"
                    />
                  </div>
                  <span className="bg-green text-white text-xs px-2 py-1 rounded">
                    {blog.categoryDetails?.name}
                  </span>
                  <h1 className="my-2">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="md:text-xl font-semibold hover:text-slate-600"
                    >
                      {blog.title}
                    </Link>
                  </h1>

                  <div className="flex md:items-center text-sm flex-col space-y-2 md:space-y-0 md:flex-row">
                    <div className="flex space-x-2 items-center">
                      <div className="w-9 h-9 bg-green rounded-full flex justify-center items-center text-white">
                        {blog.postCreator?.picture ? (
                          <img
                            src={blog.postCreator.picture.url}
                            alt={`${blog.postCreator?.name} `}
                            className="h-9 w-9 rounded-full"
                          />
                        ) : (
                          <h1 className="font-semibold text-sm">
                            {blog.postCreator?.name[0]?.toUpperCase()}
                          </h1>
                        )}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-start">
                        <Link
                          to={`/blog/author/${blog.postCreator?._id}`}
                          className="text-slate-400"
                        >
                          {`${blog.postCreator?.name} `}
                        </Link>

                        <span className="text-[12px] font-light md:font-normal md:text-xs text-slate-400 md:pl-4 flex">
                          <span className="hidden md:block">/</span>
                          {moment(blog.createdAt).format('LL')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            onNext={() => {
              if (page < pages) {
                moveToPage(page + 1);
              }
            }}
            activePage={page}
            isLast={page === pages}
            onPrev={() => {
              if (page > 1) {
                moveToPage(page - 1);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default Blogs;

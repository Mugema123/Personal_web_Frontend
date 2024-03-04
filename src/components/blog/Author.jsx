import React, { useMemo } from 'react';
import Blogs from './elements/Blogs';
import {
  FaFacebook,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useFetcher } from '../../api';

const Author = () => {
  const { id } = useParams();
  const {
    data: authorBlogsData,
    isError: authorBlogsError,
    isLoading: authorBlogsLoading,
  } = useFetcher(`/posts/getAllPosts?userId=${id}`);

  const {
    data: authorData,
    isError: authorError,
    isLoading: authorLoading,
  } = useFetcher(`/auth/getSingleUser/${id}`);

  const author = useMemo(() => {
    if (authorData?.fetchedUser) {
      return {
        id: authorData?.fetchedUser?._id,
        img: authorData?.fetchedUser?.picture?.url,
        name: authorData?.fetchedUser?.name,
        title: authorData?.fetchedUser?.author?.title,
        description: authorData?.fetchedUser?.author?.description,
        facebook: authorData?.fetchedUser?.author?.facebook,
        twitter: authorData?.fetchedUser?.author?.twitter,
        linkedin: authorData?.fetchedUser?.author?.linkedin,
      };
    }
  }, [authorData?.fetchedUser]);

  const authorBlogs = authorBlogsData?.allAvailablePosts || [];

  return (
    <>
      <div className="md:p-8 md:px-16 mt-20">
        <div className="bg-cyan-600 p-6 md:rounded-lg text-grey-601">
          {authorError && (
            <div className="text-center text-xl font-semibold">
              Author not found
            </div>
          )}
          {author && (
            <div className="md:w-1/2 mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex justify-center items-center text-white">
                        {author?.picture ? (
                          <img
                            src={author.picture.url}
                            alt={`${author?.name} `}
                            className="w-16 h-16 rounded-full"
                          />
                        ) : (
                          <h1 className="font-semibold text-3xl">
                            {author?.name[0]?.toUpperCase()}
                          </h1>
                        )}
                      </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold text-black text-lg">
                    {author.name}
                  </h2>
                  <p className="text-sm">{author.title}</p>
                </div>
              </div>
              <p className="text-center my-4">
                {author.description
                  ? author.description
                  : 'No description provided yet for this author.'}
              </p>
              <div className="flex justify-center space-x-2">
                {author.facebook && (
                  <a
                    href={author.facebook}
                    target="_blank"
                    className="bg-gray-800 text-white p-2 text-sm rounded-md hover:bg-slate-400"
                  >
                    <FaFacebook />
                  </a>
                )}
                {author.twitter && (
                  <a
                    href={author.twitter}
                    target="_blank"
                    className="bg-gray-800 text-white p-2 text-sm rounded-md hover:bg-slate-400"
                  >
                    <FaTwitter />
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    className="bg-gray-800 text-white p-2 text-sm rounded-md hover:bg-slate-400"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {author && (
          <h1 className="text-xl font-semibold my-4 mx-4 md:mx-0">
            {author?.name}'s posts
          </h1>
        )}
        {!authorError && author && (
          <Blogs blogs={authorBlogs} cols={3} />
        )}
      </div>
    </>
  );
};

export default Author;

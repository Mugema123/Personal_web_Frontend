import { useRef, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import RelatedPosts from './elements/RelatedPosts';
import { useFetcher } from '../../api';
import DataChecker from '../global/DataChecker';
import LikesCommentSection from './elements/LikesCommentSection';
import { FaBlog } from 'react-icons/fa';
import { connect } from 'react-redux';

const SingleBlog = ({ user }) => {
  const { slug } = useParams();

  const { data, isError, isLoading } = useFetcher(
    `/posts/getSinglePost?slug=${slug}`,
  );

  const blog = data?.fetchedPost || {};

  const {
    data: postsData,
    isError: postsError,
    isLoading: postsLoading,
  } = useFetcher(`/posts/getAllPosts?perPage=30`);

  const posts = useMemo(() => {
    if (
      postsData?.allAvailablePosts &&
      postsData?.allAvailablePosts?.length > 0 &&
      blog.categoryDetails?.slug
    ) {
      return {
        related: postsData?.allAvailablePosts?.filter(
          post =>
            post.categoryDetails.slug === blog.categoryDetails.slug &&
            post.slug !== slug,
        ),
        other: postsData?.allAvailablePosts?.filter(
          post =>
            post.categoryDetails.slug !== blog.categoryDetails.slug,
        ),
      };
    }
    return {
      related: [],
      other: [],
    };
  }, [postsData?.allAvailablePosts, slug, blog]);
  return (
    <DataChecker
      title={'Post'}
      isLoading={isLoading}
      isWhiteMode={true}
      isError={
        isError
          ? isError
          : !user && !blog.isPublic
          ? {
              message: `The post you are looking for is hidden from public view`,
            }
          : null
      }
    >
      <div className="md:p-12 p-5 md:pt-8 mt-20">
        <span className="bg-cyan-600 text-white text-xs px-2 py-1 rounded">
          {blog.categoryDetails?.name}
        </span>
        <h1 className="my-3 text-xl md:text-3xl font-bold">
          {blog.title}
        </h1>
        {!blog.isPublic && (
          <div className="bg-yellow-500 p-4 px-6 text-white rounded-md my-2 flex space-x-4 items-center">
            <FaBlog className="text-xl" />
            <div>
              <p className="font-bold">This blog is private</p>
              <p>
                You are viewing this in preview mode. Anyone with the
                link can access this!
              </p>
            </div>
          </div>
        )}
        <div className="flex space-x-2 items-center">
          <div className="w-9 h-9 bg-cyan-600 rounded-full flex justify-center items-center text-white">
            {blog.postCreator?.picture?.url ? (
              <img
                src={blog.postCreator?.picture?.url}
                alt={`${blog.postCreator?.name}`}
                className="h-9 w-9 rounded-full"
              />
            ) : (
              <h1 className="font-semibold text-lg">
                {blog.postCreator?.name[0]?.toUpperCase()}
              </h1>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-start">
            <Link
              to={`/blog/author/${blog.postCreator?._id}`}
              className="text-slate-400 font-semibold"
            >
              {blog.postCreator?.name}
            </Link>

            <span className="text-[12px] font-light md:font-normal md:text-xs text-slate-400 md:pl-4 flex">
              <span className="hidden md:block">/</span>
              {moment(blog.createdAt).format('LL')}
            </span>
          </div>
        </div>
        <div className="flex mt-8 md:space-x-6 items-start flex-col space-y-4 md:space-y-0 md:flex-row">
          <div className="w-full">
            <div className="md:h-96 w-full mb-4">
              <img
                src={blog.postImage}
                alt={blog.title}
                className="rounded-md object-cover h-full w-full"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: `${blog.postBody}` }}
            />
            <LikesCommentSection
              commentCount={blog?.comments_count}
              likes={blog.blog_likes}
              id={blog._id}
            />
          </div>
          <div className="w-full md:w-[45%]">
            <RelatedPosts
              blogs={posts['related']}
              title="Related posts"
            />

            <RelatedPosts
              blogs={posts['other']}
              title="Other posts"
            />
          </div>
        </div>
      </div>
    </DataChecker>
  );
};

const mapStateToProps = state => ({
  user: state.auth.presentUser?._id,
});

export default connect(mapStateToProps)(SingleBlog);

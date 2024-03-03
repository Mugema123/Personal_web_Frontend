import React, { useMemo, useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import BlogLikes from './Like';
import Comments from './comments/Comments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useFetcher } from '../../../api';
import CommentsData from './CommentsLoading';

const LikesCommentSection = ({ commentCount, id, likes }) => {
  const [availableComments, setAvailableComments] = useState([]);
  const user = localStorage.getItem('user');
  const [commentLen, setCommentLen] = useState(commentCount || 0);
  const {
    data: commentsData,
    isError: commentsError,
    isLoading: commentsLoading,
  } = useFetcher(`/posts/getAllComments/${id}`);

  useMemo(() => {
    setCommentLen(commentsData?.allAvailableComments.length);
    setAvailableComments(commentsData?.allAvailableComments);
  }, [commentsData]);

  return (
    <>
      <div className="flex my-4 space-x-8">
        <BlogLikes likes={likes} post={id} currentUser={user} />
        <div className="flex items-center cursor-pointer space-x-2">
          <span>Comment</span>
          <FaCommentAlt className="text-green" />
          <span>{commentLen}</span>
        </div>
      </div>

      <Comments
        comments={availableComments}
        onCommentAdded={comment => {
          setAvailableComments(prev => [comment, ...prev]);
          return setCommentLen(prev => prev + 1);
        }}
        onCommentRemoved={commentId => {
          setAvailableComments(prev =>
            prev.filter(comment => comment._id !== commentId),
          );
          setCommentLen(prev => prev - 1 || 0);
        }}
        onCommentEdited={newComment => {
          setAvailableComments(prev =>
            prev.map(comment =>
              comment._id !== newComment._id
                ? comment
                : { ...comment, comment: newComment.comment },
            ),
          );
        }}
        post={id}
        user={user}
      />

      <ToastContainer />
    </>
  );
};

export default LikesCommentSection;

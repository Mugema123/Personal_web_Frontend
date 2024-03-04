import React, { useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { likeComment } from '../../../../api';

const CommentLikes = ({ likes, comment, currentUser }) => {
  const [count, setCount] = useState(likes?.length || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleClick = async () => {
    try {
      const result = await likeComment(comment);
      if (result.data?.messageLikeAdded) {
        setCount(prev => prev + 1);
        setHasLiked(true);
      } else if (result.data?.messageLikeRemoved) {
        setCount(prev => prev - 1 || 0);
        setHasLiked(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.invalidToken ||
          error.response?.data?.invalidId ||
          error.response?.data?.messageNoComment ||
          error.response?.data?.message ||
          error.message,
      );
    }
  };
  return (
    <>
      <div
        className="flex items-center cursor-pointer space-x-2"
        onClick={handleClick}
      >
        <span>Like</span>
        {!hasLiked ? (
          <FaRegThumbsUp className="text-cyan-600" />
        ) : (
          <FaThumbsUp className="text-cyan-600" />
        )}
        <span>{count}</span>
      </div>
    </>
  );
};

export default CommentLikes;

import React, { useState } from 'react';
import InputBox from './InputBox';
import SingleComment from './SingleComment';
import { addComment, deleteComment } from '../../../../api';
import toast from 'react-hot-toast';
import CommentsData from '../CommentsLoading';

const Comments = ({
  comments,
  onCommentAdded,
  post,
  user,
  onCommentRemoved,
  onCommentEdited,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [addedd, setAdded] = useState(false);

  const handleSend = async comment => {
    try {
      setIsAdding(true);
      setAdded(false);
      const result = await addComment({ comment }, post);
      if (
        result.data?.successMessage &&
        result.data?.commentContent
      ) {
        toast.success(result.data?.successMessage);

        onCommentAdded({
          ...result.data?.commentContent,
          commentCreator: { ...result.data?.commentContent.user_id },
        });
        setAdded(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.invalidToken ||
          error.response?.data?.validationError ||
          error.response?.data?.invalidId ||
          error.response?.data?.postUpdateError ||
          error.response?.data?.message ||
          error.message,
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async commentId => {
    try {
      setIsDeleting(commentId);
      const result = await deleteComment(commentId);
      if (result.data?.commentDeleteSuccess) {
        onCommentRemoved(commentId);
        // toast.success(result.data.commentDeleteSuccess);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.invalidToken ||
          error.response?.data?.commentDeleteError ||
          error.response?.data?.invalidId ||
          error.response?.data?.unauthorizedError ||
          error.response?.data?.message ||
          error.message,
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <InputBox
        onSend={handleSend}
        isLoading={isAdding}
        added={addedd}
        user={user}
      />

      <CommentsData isEmpty={comments?.length === 0}>
        <h4>Comments</h4>
        <div>
          {comments?.map((comment, index) => {
            return (
              <SingleComment
                key={index}
                comment={comment}
                user={user}
                isDeleting={isDeleting === comment._id}
                onDelete={() => handleDelete(comment._id)}
                onEdit={onCommentEdited}
              />
            );
          })}
        </div>
      </CommentsData>
    </div>
  );
};

export default Comments;

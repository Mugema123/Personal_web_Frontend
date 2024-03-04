import React, { useMemo, useState } from 'react';
import { FaCommentAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { addReply, updateComment, useFetcher } from '../../../../api';
import Avatar from './Avatar';
import InputBox from './InputBox';
import Reply from './SingleReply';
import toast from 'react-hot-toast';
import CommentLikes from './CommentLikes';
import PopupModal from '../../../global/PopupModal';

const SingleComment = ({
  comment,
  user,
  onDelete,
  isDeleting,
  onEdit,
}) => {
  const [showReplyTextbox, setShowReplyTextbox] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [editingMode, setEditingMode] = useState(false);
  const [commentMessage, setCommentMessage] = useState(
    comment.comment,
  );

  const [commentReplies, setCommentReplies] = useState([]);
  const [added, setAdded] = useState(false);

  useMemo(() => {
    setCommentMessage(comment.comment);
  }, [comment.comment]);
  const {
    data: repliesData,
    isError: repliesError,
    isLoading: repliesLoading,
  } = useFetcher(`/posts/getAllCommentReplies/${comment._id}`);

  useMemo(() => {
    setCommentReplies(repliesData?.allAvailableReplies || []);
  }, [repliesData?.allAvailableReplies]);

  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = async newMessage => {
    try {
      setIsEditing(true);

      const result = await updateComment(comment._id, {
        comment: newMessage,
      });
      if (result.data?.commentUpdateSuccess) {
        toast.success(result.data.commentUpdateSuccess);
        setCommentMessage(newMessage);
        onEdit(result.data.updatedComment);
        handleCancel();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.invalidToken ||
          error.response?.data?.validationError ||
          error.response?.data?.invalidId ||
          error.response?.data?.commentUpdateError ||
          error.response?.data?.unauthorizedError ||
          error.response?.data?.message ||
          error.message,
      );
    } finally {
      setIsEditing(false);
    }
  };

  const handleReply = async message => {
    try {
      setIsEditing(true);
      setAdded(false);
      const result = await addReply(comment._id, {
        reply: message,
      });
      if (result.data?.successMessage) {
        // toast.success(result.data.successMessage);
        handleCancel();
        setCommentReplies(prev => [
          ...prev,
          {
            ...result.data.replyContent,
            replyCreator: { ...result.data.replyContent.user_id },
          },
        ]);
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
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditingMode(false);
    setShowReplyTextbox(false);
  };

  const isOwner = user?._id === comment.commentCreator._id;
  // console.log(comment);
  return (
    <>
      <div className="my-2">
        <div className="flex">
          <Avatar
            letter={`${
              comment.commentCreator?.name
                ? comment.commentCreator?.name?.charAt(0)
                : ''
            }`}
            image={comment.commentCreator?.picture?.url}
          />
          <div className="w-full pl-3">
            <div className="flex space-x-1 md:items-center flex-col md:flex-row">
              <p className="font-semibold">
                {comment.commentCreator.name}
              </p>
              <span className="text-grey-601 text-xs md:text-sm">
                <span className="hidden md:inline">/ </span>
                {comment.createdAt}
              </span>
            </div>
            <div className="text-slate-400 text-sm my-1">
              {commentMessage}
            </div>

            <div className="flex my-2 space-x-4 text-xs">
              <CommentLikes
                likes={comment.commentLikes}
                comment={comment._id}
              />
              <div
                className="flex items-center cursor-pointer space-x-2"
                onClick={() =>
                  !editingMode &&
                  setShowReplyTextbox(!showReplyTextbox)
                }
              >
                <span>Reply</span>
                <FaCommentAlt className="text-cyan-600" />{' '}
                <span>{commentReplies.length}</span>
              </div>
              {isOwner && (
                <div className="flex space-x-4 md:pl-4">
                  <div
                    className="flex items-center cursor-pointer space-x-2"
                    onClick={() => {
                      setEditingMode(true);
                      return setShowReplyTextbox(true);
                    }}
                  >
                    <FaEdit className="text-cyan-600" />{' '}
                    <span>Edit</span>
                  </div>
                  <div
                    className="flex items-center cursor-pointer space-x-1"
                    onClick={() => {
                      if (isDeleting) return;
                      setOpenModal(true);
                      // onDelete();
                    }}
                  >
                    <FaTrash className="text-red-400" />{' '}
                    <span>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" pl-2 md:ml-12 md:pl-4 md:py-1 my-3 border-l-2">
          {commentReplies.map((reply, index) => {
            return (
              <Reply
                reply={reply}
                key={index}
                user={user}
                added={added}
                replyBox={
                  <InputBox
                    reply={true}
                    onCancel={handleCancel}
                    added={added}
                    isLoading={isEditing}
                    user={user}
                    onSend={handleReply}
                  />
                }
              />
            );
          })}
        </div>
        {showReplyTextbox && (
          <div>
            <InputBox
              reply={true}
              edit={editingMode === true ? commentMessage : null}
              onCancel={handleCancel}
              added={added}
              isLoading={isEditing}
              user={user}
              onSend={message => {
                if (editingMode === true) {
                  handleEdit(message);
                } else {
                  handleReply(message);
                }
              }}
            />
          </div>
        )}
      </div>
      <PopupModal
        onClose={handleCloseModal}
        show={openModal}
        title={'Delete Comment'}
      >
        <div>Are you sure do you want to delete this comment</div>
        <p className="my-2 font-semibold text-center">
          "{commentMessage}"
        </p>
        <div className="flex space-x-2 text-sm text-white">
          <button
            className="bg-red-400 rounded-full px-4 py-1 hover:shadow-lg mx-4 my-2"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </button>
          <button
            className="bg-green-800 rounded-full px-4 py-1 hover:shadow-lg mx-4 my-2"
            onClick={() => {
              handleCloseModal();
              setShowReplyTextbox(false);
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </PopupModal>
    </>
  );
};

export default SingleComment;

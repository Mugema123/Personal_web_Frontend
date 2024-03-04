import moment from 'moment';
import React, { useMemo, useState } from 'react';
import {
  FaCommentAlt,
  FaRegComment,
  FaRegCommentAlt,
} from 'react-icons/fa';
import Avatar from './Avatar';

const Reply = ({ reply, user, replyBox, added }) => {
  const [show, setShow] = useState(false);
  useMemo(() => {
    if (added) {
      setShow(false);
    }
  }, [added]);
  return (
    <>
      <div className="flex my-2">
        <Avatar
          color="bg-cyan-600"
          letter={reply?.replyCreator?.name?.charAt(0) || ''}
          image={reply.replyCreator?.picture?.url}
        />
        <div className="w-full pl-3">
          <div className="flex space-x-1 md:items-center flex-col md:flex-row">
            <p className="font-semibold">{reply.replyCreator.name}</p>
            <span className="text-grey-601 text-xs md:text-sm">
              <span className="hidden md:inline">/ </span>
              {reply.createdAt}
            </span>
          </div>
          <div className="text-slate-400 text-sm my-1">
            {reply.reply}
          </div>
          <div
            className="flex items-center cursor-pointer space-x-2 text-xs"
            onClick={() => setShow(!show)}
          >
            <span>Reply</span>
            <FaRegComment className="text-cyan-600" />
          </div>
        </div>
      </div>
      {show && replyBox}
    </>
  );
};

export default Reply;

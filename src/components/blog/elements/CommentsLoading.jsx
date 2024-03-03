import React from 'react';

const CommentsData = ({ children, isEmpty, isLoading, isError }) => {
  if (isEmpty) {
    return (
      <div className="text-sm my-8 text-center">
        No comments yet, be the first to comment on this blog.
      </div>
    );
  }
  return <div>{children}</div>;
};

export default CommentsData;

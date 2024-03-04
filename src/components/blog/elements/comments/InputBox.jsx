import React, { useMemo, useState } from 'react';
import Avatar from './Avatar';
import { PulseLoader } from 'react-spinners';

const InputBox = ({
  reply,
  onCancel,
  onSend,
  isLoading,
  added,
  user,
  edit,
}) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (isLoading) return;

    if (!message || message.length < 3 || !user) {
      setError(
        !message
          ? 'Input field required *'
          : message.length < 3
          ? 'Message is too short'
          : 'Please log in to be able to add a comment',
      );
      return;
    }
    if (edit && message === edit) {
      setError('Provide a different message if you want to update');
      return;
    }
    setError('');
    onSend(message);
  };

  useMemo(() => {
    if (edit) {
      setMessage(edit);
      return;
    }
    setMessage('');
  }, [edit, added]);

  const handleCancel = e => {
    e.preventDefault();
    setMessage('');
    setError('');
    onCancel();
  };

  return (
    <div className={`${reply ? 'pl-4 md:pl-12 mt-6' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-end space-y-3">
          <div className="flex space-x-2 w-full">
            <Avatar
              letter={user?.name[0]}
              image={user?.picture?.url}
            />
            <textarea
              className="rounded-lg w-full border border-grey-601 ring-0 focus:border-green focus:ring-1 focus:ring-green resize-none placeholder:text-sm p-2 px-3"
              rows={reply ? 3 : 4}
              draggable={false}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={
                reply
                  ? edit
                    ? 'Type your new update message...'
                    : 'Type your reply...'
                  : 'Enter a message...'
              }
             
            ></textarea>
          </div>
          <div className="flex justify-start w-full pl-12">
            <p className="text-red-600 flex-grow text-xs">{error}</p>

            {reply && !isLoading && (
              <button
                className="text-xs bg-red-600 text-white rounded-full px-3 py-1 hover:shadow-lg mr-2"
                type="clear"
                onClick={handleCancel}
              >
                {'Cancel'}
              </button>
            )}
            <button
              className="text-xs bg-cyan-600 text-white rounded-full px-3 py-1 hover:shadow-lg transition duration-300"
              type="submit"
            >
              {isLoading ? (
                <PulseLoader
                  color="#ffffff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : reply ? (
                edit ? (
                  'Update'
                ) : (
                  'Reply'
                )
              ) : (
                'Comment'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputBox;

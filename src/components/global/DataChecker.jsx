import { PulseLoader } from 'react-spinners';
import attention from '../../assets/images/attention.png';

const DataChecker = ({
  isLoading,
  isError = null,
  children,
  title,
  isEmpty,
  isWhiteMode = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col justify-center items-center my-12 space-y-6 flex-grow">
        <PulseLoader
          color={isWhiteMode ? '#ffffff' : '#000000'}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p
          className={`${
            isWhiteMode ? 'text-slate-100' : 'text-slate-600'
          }`}
        >
          {title ? title : 'Data'} loading, please wait...
        </p>
      </div>
    );
  }
  if (isError) {
    const error = isError.response?.data || isError;
    return (
      <div className="flex flex-col p-4 items-center flex-grow">
        <img src={attention} width={60} />
        <p className="p-3 rounded-lg text-center">
          {(error?.message === 'Network Error'
            ? 'Network Error, please check your internet connection'
            : error?.message) || 'Something went wrong'}
        </p>
        <button
          className="bg-red-500 hover:bg-slate-500 text-white rounded-full px-4 py-1 text-xs"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="flex justify-center w-full items-center py-12 text-center flex-grow">
        <p
          className={`${
            isWhiteMode ? 'text-gray-100' : 'text-gray-500'
          } text-xl`}
        >
          There are no {title ? title.toLowerCase() : 'data'} yet!{' '}
        </p>
      </div>
    );
  }
  return <>{children}</>;
};

export default DataChecker;
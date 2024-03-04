import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="w-[80%] sm:w-[65%] md:w-1/2 mx-auto flex flex-col items-center text-center space-y-4 my-8 px-4 py-8 rounded-3xl border">
      <FaExclamationTriangle className="text-3xl text-slate-500" />

      <p>The page you're looking for is not available</p>
      <Link
        to="/"
        className="text-xs bg-green text-white rounded-full px-4 py-2 shadow-lg hover:shadow-none"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

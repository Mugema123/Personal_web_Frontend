import { FaFacebook } from 'react-icons/fa';

const FacebookButton = ({ onClick }) => {
  return (
    <div className="w-full flex items-center space-x-4 border rounded-md cursor-pointer px-4 py-3 justify-center" onClick={onClick}>
      <div>
        <FaFacebook className='text-blue'/>
      </div>
      <span className="text-sm">Continue with Facebook</span>
    </div>
  );
};

export default FacebookButton;

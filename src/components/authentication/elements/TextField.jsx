import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const TextField = ({ type, label, hint, fieldName, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col w-full my-2 md:my-4">
      <label htmlFor={label}>{label}</label>
      <div className="relative flex items-center">
        <input
          type={showPassword ? 'text' : type}
          placeholder={hint}
          id={label}
          name={fieldName}
          onChange={handleChange}
          className="border border-grey-601 ring-0 px-4 py-2 rounded-md my-2 placeholder:text-xs bg-transparent  text-sm flex-1"
        />
        {isPassword && (
          <div
            className="absolute right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            { showPassword ? <AiFillEyeInvisible className='text-cyan-600'/> : <AiFillEye className='text-cyan-600'/> }
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;

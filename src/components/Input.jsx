import React, { useId, useState } from 'react';
import { EyeOn, EyeOff } from './Eyecons';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='w-full'>
      {label && (
        <label
          className='inline-block mb-1 pl-1 text-gray-800 dark:text-gray-200'
          htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={`px-3 py-2 dark:hover:bg-slate-50 rounded-lg bg-gray-100 dark:bg-slate-200 text-black focus:bg-gray-50 dark:text-gray-800 outline-none hover:bg-gray-50 border border-gray-300 dark:border-gray-700 w-full duration-200 ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
          >
            {showPassword ? <EyeOn /> : <EyeOff />}
          </button>
        )}
      </div>
    </div>
  );
});

export default Input;

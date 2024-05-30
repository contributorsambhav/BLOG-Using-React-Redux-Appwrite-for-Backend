import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label
          className='inline-block mb-1 pl-1 text-gray-800 dark:text-gray-200'
          htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 dark:hover:bg-slate-50 rounded-lg bg-gray-100 dark:bg-slate-200 text-black focus:bg-gray-50 dark:text-gray-800 outline-none hover:bg-gray-50 border border-gray-300 dark:border-gray-700 w-full duration-200 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex pt-10  pb-28 items-center justify-center bg-gray-200 dark:bg-gray-700'>
      <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl shadow-2xl shadow-violet-400 dark:bg-gray-900  p-10 border border-black/10`}>
        <div className='mb-4 text-center'>
          <Logo width='100' />
        </div>
        <h2 className='text-center text-2xl font-bold text-gray-800 dark:text-white'>Sign in to your account</h2>
        <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
          Don't have an account?&nbsp;
          <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-4 text-sm'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-4'>
          <div className='space-y-4'>
            <Input
              label='Email'
              type='email'
              placeholder='Enter your email'
              {...register('email', {
                required: true,
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            <Input
              label='Password'
              type='password'
              placeholder='Enter your password'
              {...register('password', { required: true })}
            />
            <Button type='submit' className='hover:bg-blue-700 w-full'>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

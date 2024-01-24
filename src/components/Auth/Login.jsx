import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../slices/authSlice';
import { login } from '../Services/authService';

import {  useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; 

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);

      dispatch(loginSuccess(response.token));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('Login failed'));
    }
  };

  const responseGoogle = (response) => {

    if (response.credential) {
      dispatch(loginSuccess(response.credential));
      navigate('/');
    } else {
      console.log('Google Sign-In failed.');
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen h-calc bg-gray-100">

      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl
      rounded-2xl md:flex-row md:space-y-0">
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <span className="mb-3 text-4xl font-bold">Welcome to Upesi</span>
          
          <div className="py-4">
            <span className="mb-2 text-md font-bold">Enter your username</span>
              <input
              type="text"
              id="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
          </div>
          <div className="py-2">
            <span className='mb-2 text-md'>Password</span>
              <input
              type="password"
              id="password"
              placeholder='Enter your password'
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

          </div>

          <div className='flex justify-end w-full py-4'>
            <span class="font-bold text-md">Forgot your password?</span>
            </div>
            
          <button class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">Sign in</button>
            <button className="mb-6">
               <GoogleLogin
                clientId="600187593848-6ci83f9a0fr37o3bkjponf636v2tslri.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                width="100px"
              />
          </button>

          <div className='text-center text-gray-400'>
            Don't have an account?
            <span className='font-bold text-black pl-1'>Sign up for free</span>

          </div>
        </div>
        </div>

      </form>
    
    </div>
  );
};

export default LoginForm;

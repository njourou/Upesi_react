import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../slices/authSlice';
import { login } from '../Services/authService';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  // Redux useDispatch hook for dispatching actions
  const dispatch = useDispatch();

  // State for managing form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Destructuring form data
  const { username, password } = formData;

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle the submission of the login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to login using the provided credentials
      const response = await login(formData);

      // Dispatch success action with the received token
      dispatch(loginSuccess(response.token));

      // Redirect to the home page upon successful login
      navigate('/');
    } catch (error) {
      // Dispatch failure action if login fails
      dispatch(loginFailure('Login failed'));
    }
  };

  // Function to handle Google Sign-In response
  const responseGoogle = (response) => {
    if (response.credential) {
      // Dispatch success action with the Google Sign-In credential
      dispatch(loginSuccess(response.credential));

      // Redirect to the home page upon successful login
      navigate('/');
    } else {
      // Log an error message if Google Sign-In fails
      console.log('Google Sign-In failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-calc bg-gray-100">
      <form onSubmit={handleSubmit}>
        {/* Form Layout */}
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Section */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            {/* Logo or welcome message */}
            <span className="mb-3 text-4xl font-bold">Welcome to Upesi</span>
            
            {/* Username Input */}
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
            
            {/* Password Input */}
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

            {/* Forgot Password Link */}
            <div className='flex justify-end w-full py-4'>
              <span className="font-bold text-md">Forgot your password?</span>
            </div>

            {/* Sign-In Button */}
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
              Sign in
            </button>

            {/* Google Sign-In Button */}
            <button className="mb-6">
              <GoogleLogin
                clientId="427221247899-t845r7r4keo2fj6fa7a4u63ickt17hd8.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                width="100px"
              />
            </button>

            {/* Sign-Up Prompt */}
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

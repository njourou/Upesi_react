
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerSuccess, registerFailure } from '../../slices/authSlice';
import { register } from '../Services/authService';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const { email, username, password, firstName, lastName } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData);
      dispatch(registerSuccess(response.id));
      console.log(response);
    } catch (error) {
      dispatch(registerFailure('Registration failed'));
      console.log("Not registred");
    }
  };

  return (
    <div>
      <h2 className="mt-40">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

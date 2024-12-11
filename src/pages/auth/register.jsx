import React from 'react';
import { toast } from 'react-toastify';
import {showCustomToast } from '../../utils/showCustomToast';
import usePennyPincherStore from '../../store/PennyPincher';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const actionRegister = usePennyPincherStore((state) => state.actionRegister);
    const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Register form submitted');
    // console .log(e.target.name.value);
    // console .log(e.target.email.value);
    // console .log(e.target.password.value);
    // console .log(e.target.confirmPassword.value);
    if (e.target.password.value !== e.target.confirmPassword.value) {
      showCustomToast("Password does not match", "error");
      return;
    }

    const formData = {
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

   try {
      const res = await actionRegister(formData);
      if (res.status === 200) {
        showCustomToast("Register successfully", "success");
        navigate('/login');
      }else{
        showCustomToast(res.response.data.msg, "error");
      }
    } catch (error) {
      console.log(error);
  };
};

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-pink-500">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="text-black block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="text-black block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="text-black block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className=" text-black block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-pink-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

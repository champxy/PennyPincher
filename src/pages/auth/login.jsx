import React from 'react';
import usePennyPincherStore from '../../store/PennyPincher';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showCustomToast } from '../../utils/showCustomToast';

const Login = () => {
    const actionLogin = usePennyPincherStore((state) => state.actionLogin);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target.email.value);
        // console.log(e.target.password.value);
        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
      try {
        const response =   await actionLogin(formData);
      if(response.status === 200){
          showCustomToast("Welcome back!", "success");
          navigate('/user');
      }else{
        console.log(response.response.data.msg);
          showCustomToast(response.response.data.msg, "wrong");
      }
      }catch(error){
          console.error(error);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 text-black block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-pink-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 text-black block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-pink-500"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-pink-500 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

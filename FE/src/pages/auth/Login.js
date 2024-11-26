import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../api/axiosInstance';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', credentials);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/');
    } catch (error) {
      setCredentials((prev) => ({ username: prev.username, password: '' }));
      console.error('Login failed:', error);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='Username' value={credentials.username} onChange={handleChange} className='w-full p-3 border rounded mb-4' required />
        <input type='password' name='password' placeholder='Password' value={credentials.password} onChange={handleChange} className='w-full p-3 border rounded mb-4' required />
        <button type='submit' className='w-full p-3 bg-gray-800 text-white rounded hover:bg-gray-900'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

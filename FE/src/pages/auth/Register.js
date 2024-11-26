import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/register', credentials);
      toast.success('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='Username' value={credentials.username} onChange={handleChange} className='w-full p-3 border rounded mb-4' required />
        <input type='password' name='password' placeholder='Password' value={credentials.password} onChange={handleChange} className='w-full p-3 border rounded mb-4' required />
        <button type='submit' className='w-full p-3 bg-gray-800 text-white rounded hover:bg-gray-900'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

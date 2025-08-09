import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/ui/Loader';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (pwd) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return strongRegex.test(pwd);
  };

  const handleSignup = async () => {
    if (loading) return;
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required.');
      return;
    }

    if (name.length < 2) {
      toast.error('Min 2 characters for name.');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Invalid email address.');
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error('Invalid password format.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email: email.toLowerCase(),
        password,
      });

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Signup successful!');
        navigate('/dashboard');
      } else {
        toast.error('Signup failed.');
      }
      setLoading(false);

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message?.toLowerCase() || '';
      const errorText = error.response?.data?.error?.toLowerCase() || '';

      if ((status === 400 || status === 409) && (message.includes("email") || errorText.includes("email"))) {
        toast.error('Email already exists.');
      } else if (status === 400 && (message.includes("password") || errorText.includes("password"))) {
        toast.error('Password does not meet requirements.');
      } else {
        toast.error('Oops! Try again later.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white overflow-hidden w-full max-w-[1728px] relative">

        <div className="absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[399px] h-[325px] top-[230px] right-[380px] rotate-[47.67deg] opacity-[0.32]">
            <div className="relative h-[325px]">
              <div className="absolute w-[399px] h-[285px] top-0 left-0 rounded-[199.42px/142.27px] blur-[100px] bg-[linear-gradient(180deg,rgba(9,9,9,0)_0%,rgba(111,0,255,1)_100%)]" />
              <div className="absolute w-48 h-[194px] top-[132px] left-[104px] blur-[100px] bg-[linear-gradient(180deg,rgba(24,75,255,0)_0%,rgba(255,255,255,0.69)_100%)]" />
            </div>
          </div>

          <div className="absolute w-[685px] h-[559px] top-[280px] right-[-100px] rotate-[18.50deg] opacity-[0.52]">
            <div className="relative h-[559px]">
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(151,71,255,1)_100%)] absolute w-[685px] h-[489px] top-0 left-0 rounded-[342.5px/244.34px] blur-[100px]" />
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.69)_100%)] absolute w-[329px] h-[333px] top-[226px] left-[178px] blur-[100px]" />
            </div>
          </div>

          <div className="absolute w-[685px] h-[559px] top-[400px] left-[-300px] rotate-[47.67deg] opacity-[0.52]">
            <div className="relative h-[559px]">
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(151,71,255,1)_100%)] absolute w-[685px] h-[489px] top-0 left-0 rounded-[342.5px/244.34px] blur-[100px]" />
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.69)_100%)] absolute w-[329px] h-[333px] top-[226px] left-[178px] blur-[100px]" />
            </div>
          </div>

         
        </div>


        <div className="flex justify-center items-center h-screen relative z-10">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-sm text-gray-500 mb-4">
              <em>Min 8 chars, uppercase, lowercase, number &amp; special char</em>
            </p>

            <button
              onClick={handleSignup}
              className={`cursor-pointer w-full py-3 rounded-md transition ${loading
                  ? 'bg-purple-400 cursor-not-allowed text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
            >
              {loading ? 'Please wait...' : 'Signup'}
            </button>

            <p className="text-center mt-4 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="cursor-pointer text-purple-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

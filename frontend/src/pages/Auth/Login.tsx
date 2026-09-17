import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login logic here', { email, password });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center font-sans relative overflow-hidden px-4">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/50 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-serif">
          Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md mt-4"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          New Customer?{' '}
          <Link to="/register" className="text-purple-600 hover:underline font-medium">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

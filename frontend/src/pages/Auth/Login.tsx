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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center font-sans relative overflow-hidden px-4">
      {/* Decorative gradient blobs based on strict palette */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-secondary/30 rounded-full mix-blend-multiply filter blur-[150px] opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
      
      {/* Back to Home Link */}
      <div className="absolute top-8 left-8 z-50">
        <Link to="/" className="text-slate-600 hover:text-primary font-medium flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </Link>
      </div>

      {/* High-Fidelity Glassmorphism Card */}
      <div className="relative glass-panel p-10 sm:p-12 rounded-3xl w-full max-w-md z-10">
        <div className="text-center mb-10">
          <span className="font-serif text-3xl font-bold text-primary tracking-tight">Flora&Co.</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-6 font-sans">
            Welcome Back
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-sm">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-5 py-3 bg-white/50 border border-slate-200/50 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-accent/80 focus:border-accent/80 transition-all shadow-xs text-slate-700 placeholder-slate-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-5 py-3 bg-white/50 border border-slate-200/50 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-accent/80 focus:border-accent/80 transition-all shadow-xs text-slate-700 placeholder-slate-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-accent focus:ring-accent border-gray-300" />
              <span className="ml-2 text-sm text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-sm font-semibold text-accent hover:text-primary transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-pink-600 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 mt-4"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-600 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-accent hover:underline font-bold transition-colors">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

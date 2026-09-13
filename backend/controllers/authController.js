import User from '../models/User.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  res.status(200).json({ message: 'Register user endpoint ready for logic' });
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  res.status(200).json({ message: 'Login user endpoint ready for logic' });
};
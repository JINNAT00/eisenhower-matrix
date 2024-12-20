// src/api/authApi.js
import axios from 'axios';

const API_URL = 'https://eisenhower-matrix-backend-production.up.railway.app'; // Backend signup URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; // Return data on success (e.g., token or success message)
  } catch (error) {
    throw error.response.data.message || 'Signup failed'; // Handle errors from API
  }
};


export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data; // Expecting { accessToken: string }
};



export const verifyOtp = async (otpData) => {
    try {
      const response = await axios.post('https://eisenhower-matrix-backend-production.up.railway.app/users/verify-otp', otpData);
      return response.data; // Assuming the backend sends a success message
    } catch (error) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
  };

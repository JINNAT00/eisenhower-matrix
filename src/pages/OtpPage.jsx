// src/pages/OtpPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // To redirect after successful OTP verification
import { verifyOtp } from '../api/authApi'; // Import the verify OTP function
import InputField from '../components/InputField'; // Input Field Component
import Button from '../components/Button'; // Button Component
import { storeToken } from '../utils/tokenUtils';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Retrieve email from navigation state

  useEffect(() => {
    if (!email) {
      setError('Email is required');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for OTP input
    if (!otp) {
      setError('OTP is required');
      return;
    }

    const otpData = { email, otp };

    try {
      const response = await verifyOtp(otpData); // Send OTP to the backend
      const { token } = response; // Assuming backend returns a token
    storeToken(token); // Save token
    console.log('Token saved successfully:', token);
      // Redirect to login page after successful OTP verification
      navigate('/login');
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* OTP input field */}
          <InputField
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button text="Verify OTP" type="submit" />
        </form>
        <div className="mt-4 text-center">
          <p>
            Didn't receive OTP?{' '}
            <a href="/resend-otp" className="text-blue-500">Resend OTP</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;

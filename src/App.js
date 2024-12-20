// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import OtpPage from './pages/OtpPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import AddNote from './pages/AddNote';
import EditNotePage from './pages/EditNotePage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/create-note" element={<AddNote />} />
          <Route path="/edit-note" element={<EditNotePage/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
  


export default App;

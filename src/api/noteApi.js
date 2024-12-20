import axios from 'axios';
import { getToken } from '../utils/tokenUtils'; // Import your cookie utility


const API_URL = 'https://eisenhower-matrix-backend-production.up.railway.app/notes'; // Replace with your backend URL

// Fetch all notes
export const fetchAllNotes = async () => {
  try {
    const token = getToken(); // Get token from cookies
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in headers
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notes.');
  }
};

// Example for adding a new note
export const createNote = async (noteData) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL, noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create note.');
  }
};

export const deleteNote = async (noteId) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update an existing note
export const updateNote = async (noteId, updatedData) => {
  try {
    const token = getToken();  // Get token from cookie or local storage
    const response = await axios.put(`${API_URL}/${noteId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update note.');
  }
};
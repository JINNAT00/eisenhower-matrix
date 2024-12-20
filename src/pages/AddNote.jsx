import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    type: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken(); // Get token from cookies or storage
    try {
      const response = await axios.post(
        'https://eisenhower-matrix-backend-production.up.railway.app/notes',
        {
          ...note,
          createdAt: new Date().toISOString(), // Note payload
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        }
      );

      alert('Note created successfully!');
      console.log(response.data);
      navigate('/'); // Navigate to the home page on success
    } catch (error) {
      console.error('Error creating note:', error.response?.data || error.message);
      alert('Failed to create note ${error}');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={note.type}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateNote } from '../api/noteApi'; // Import the update note API

const EditNote = () => {
  const location = useLocation();
  const { note } = location.state || {}; // Access the note object passed via state

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdateNote = async () => {
    try {
      const updatedNote = await updateNote(note.id, { title, content });
      alert('Note updated successfully!');
      navigate('/'); // Navigate back to HomePage
    } catch (error) {
      console.error('Failed to update note:', error);
      alert('Failed to update note');
    }
  };

  return (
    <div className="edit-note p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Note</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 mb-4 border rounded-md"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
        className="w-full p-2 mb-4 border rounded-md"
      />
      <button
        onClick={handleUpdateNote}
        className="update-note-btn mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Update Note
      </button>
    </div>
  );
};

export default EditNote;

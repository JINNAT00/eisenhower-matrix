import React, { useState, useEffect } from 'react';
import { fetchAllNotes, deleteNote } from '../api/noteApi'; // Import deleteNote API
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [longPressTimer, setLongPressTimer] = useState(null); // Timer for long press
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await fetchAllNotes();
        setNotes(fetchedNotes);
        setFilteredNotes(fetchedNotes);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSearch = (query) => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFilter = () => {
    alert('Filter functionality not implemented yet!');
  };

  const handleCreateNote = () => {
    navigate('/create-note');
  };

  const handleLongPress = (noteId) => {
    setLongPressTimer(
      setTimeout(() => {
        if (window.confirm('Do you want to delete this note?')) {
          handleDelete(noteId);
        }
      }, 800) // Trigger delete option after 800ms
    );
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer); // Cancel long press action if released early
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId); // Call the API to delete the note
      setNotes(notes.filter((note) => note.id !== noteId)); // Update the notes list
      setFilteredNotes(filteredNotes.filter((note) => note.id !== noteId));
      alert('Note deleted successfully!');
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note');
    }
  };

  return (
    <div className="home-page p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Notes</h1>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      {isLoading ? (
        <p className="text-gray-600">Loading notes...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-600">No notes found.</p>
      ) : (
        <div className="note-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-200"
              onMouseDown={() => handleLongPress(note.id)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
            >
              <NoteCard
                note={note}
                onClick={() => navigate('/edit-note', { state: { note } })} // Pass note object to edit page
              />
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleCreateNote}
        className="add-note-btn mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Note
      </button>
    </div>
  );
};

export default HomePage;

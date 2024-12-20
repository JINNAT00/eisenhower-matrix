import React from 'react';

const NoteCard = ({ note, onClick }) => (
  <div className="note-card" onClick={onClick}>
    <h3>{note.title}</h3>
    <p>{note.content}</p>
    <small>{note.type}</small>
    <small>{new Date(note.createdAt).toLocaleString()}</small>
  </div>
);

export default NoteCard;

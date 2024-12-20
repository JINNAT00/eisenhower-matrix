import React from 'react';

const SearchBar = ({ onSearch, onFilter }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search notes..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <button onClick={onFilter}>Filter</button>
  </div>
);

export default SearchBar;

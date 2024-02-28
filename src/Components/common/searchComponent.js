import React, { useState } from 'react';
import '../../Styles/HomePage/searchComponent.css'; // Assume you have a CSS file for styling

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Posts', 'People', 'Photos', 'Videos', 'Pages', 'Groups'];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    // Optionally, trigger a search or filter operation here
  };

  return (
    <div className="search-container">
      <div className="filter-options">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => selectFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;

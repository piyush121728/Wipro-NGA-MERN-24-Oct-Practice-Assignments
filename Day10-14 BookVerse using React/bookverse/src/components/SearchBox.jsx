// SearchBox.jsx
// Controlled component for managing search input

import React from "react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
    // Handle input change event
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBox;

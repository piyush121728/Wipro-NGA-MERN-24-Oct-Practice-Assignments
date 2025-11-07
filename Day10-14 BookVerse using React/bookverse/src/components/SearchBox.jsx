// SearchBox.jsx
// Controlled + Uncontrolled component (using ref)

import React from "react";

const SearchBox = ({ searchTerm, setSearchTerm, inputRef }) => {
    return (
        <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
            className="form-control my-3"
        />
    );
};

export default SearchBox;

// BookList.jsx
// Parent component that renders multiple BookCard components

import React, { useState } from "react";
import BookCard from "./BookCard";
import SearchBox from "./SearchBox";
import booksData from "../data/booksData";

const BookList = () => {
    // State for list of books and layout mode
    const [layout, setLayout] = useState("grid"); // grid or list
    const [searchTerm, setSearchTerm] = useState("");

    // Function to handle layout toggle
    const toggleLayout = () => {
        setLayout(layout === "grid" ? "list" : "grid");
    };

    // Filter books based on search input
    const filteredBooks = booksData.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="book-list-container">
            <h2>Featured Books</h2>

            {/* Controlled input for search */}
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Layout toggle button */}
            <button onClick={toggleLayout} className="toggle-btn">
                Switch to {layout === "grid" ? "List" : "Grid"} View
            </button>

            {/* Render filtered books */}
            <div className={`book-list ${layout}`}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            layout={layout}
                        />
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default BookList;

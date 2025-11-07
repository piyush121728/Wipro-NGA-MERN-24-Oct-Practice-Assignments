// BookList.jsx
// Combines BookCard, AuthorInfo, and demonstrates Refs (Uncontrolled Components)

import React, { useState, useRef } from "react";
import BookCard from "./BookCard";
import SearchBox from "./SearchBox";
import AuthorInfo from "./AuthorInfo";
import booksData from "../data/booksData";
import "bootstrap/dist/css/bootstrap.min.css";

const BookList = () => {
    const [layout, setLayout] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    // Ref for focusing on the search input
    const searchRef = useRef(null);

    const toggleLayout = () => {
        setLayout(layout === "grid" ? "list" : "grid");
    };

    const filteredBooks = booksData.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const focusSearch = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Featured Books</h2>

            <SearchBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                inputRef={searchRef}
            />

            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-primary" onClick={toggleLayout}>
                    Switch to {layout === "grid" ? "List" : "Grid"} View
                </button>
                <button className="btn btn-secondary" onClick={focusSearch}>
                    Focus Search
                </button>
            </div>

            <div
                className={`book-list d-${layout === "grid" ? "grid" : "flex"} flex-wrap`}
            >
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        layout={layout}
                        onSelectAuthor={setSelectedAuthor}
                    />
                ))}
            </div>

            {/* Author Info Section */}
            <AuthorInfo author={selectedAuthor} />
        </div>
    );
};

export default BookList;

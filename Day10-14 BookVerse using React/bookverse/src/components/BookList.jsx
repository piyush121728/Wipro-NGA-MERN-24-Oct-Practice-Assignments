import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import SearchBox from "./SearchBox";
import AuthorInfo from "./AuthorInfo";
import RenderMessage from "./RenderMessage";
import { Link } from "react-router-dom";
import withLoader from "./withLoader";
import "bootstrap/dist/css/bootstrap.min.css";


const BookList = ({ loading, setLoading }) => {
    const [books, setBooks] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const searchRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8000/books")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);     // not data.books ❌
                setLoading(false);
            });
    }, [setLoading]);

    const toggleLayout = () => setLayout(layout === "grid" ? "list" : "grid");
    const focusSearch = () => searchRef.current && searchRef.current.focus();

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h2 className="mt-4">Featured Books</h2>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} inputRef={searchRef} />

            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-primary" onClick={toggleLayout}>
                    Switch to {layout === "grid" ? "List" : "Grid"} View
                </button>
                <button className="btn btn-secondary" onClick={focusSearch}>Focus Search</button>
            </div>

            {filteredBooks.length === 0 && (
                <RenderMessage render={() => "No books found. Try a different search!"} />
            )}

            <div className={`book-list d-${layout === "grid" ? "grid" : "flex"} flex-wrap`}>
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                        layout={layout}
                    />
                ))}
            </div>

            {/* <AuthorInfo author={selectedAuthor} /> */}
        </div>
    );
};

export default withLoader(BookList);


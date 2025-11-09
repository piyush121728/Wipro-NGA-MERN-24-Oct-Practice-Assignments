// BookDetails.jsx
// Displays detailed information about a single book using dynamic routing

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import withLoader from "./withLoader";
import "bootstrap/dist/css/bootstrap.min.css";

const BookDetails = ({ loading, setLoading }) => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBook(data);
                setLoading(false);
            });

    }, [id, setLoading]);

    

    if (!book) return null;

    return (
        <div className="container mt-5 fade-in">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-primary">{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Price:</strong> ₹{book.price}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <Link to="/home" className="btn btn-dark mt-3">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default withLoader(BookDetails);

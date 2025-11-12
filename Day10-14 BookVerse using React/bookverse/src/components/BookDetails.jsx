// BookDetails.jsx - add edit and delete actions
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import withLoader from "./withLoader";
import apiClient from '../utils/apiClient';
import { storeInstance } from '../flux/di';

const BookDetails = ({ loading, setLoading }) => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBook(data);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id, setLoading]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await apiClient.del(`/books/${id}`);
            // update local store: remove book
            storeInstance._books = storeInstance.getBooks().filter(b => b.id !== Number(id));
            storeInstance.emitChange();
            navigate('/home');
        } catch (err) {
            console.error('Delete failed', err);
            alert('Failed to delete');
        }
    };

    if (!book) return null;

    return (
        <div className="container mt-5 fade-in">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1 className="card-title text-primary">Book Details:</h1>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Price:</strong> ₹{book.price}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <div className="mt-3">
                        <Link to={`/edit/${id}`} className="btn btn-warning me-2">Edit</Link>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        <Link to="/home" className="btn btn-dark ms-2">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withLoader(BookDetails);

// AuthorInfo.jsx
// Class component to display author details and lifecycle usage

import React, { Component } from "react";
import authorsData from "../data/authorsData";
import "bootstrap/dist/css/bootstrap.min.css";

class AuthorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { author: null };
    }

    componentDidMount() {
        // Log when author details load
        console.log("AuthorInfo component mounted, loading author data...");
        this.loadAuthorInfo(this.props.author);
    }

    componentDidUpdate(prevProps) {
        // Load author details when a different book is clicked
        if (prevProps.author !== this.props.author) {
            this.loadAuthorInfo(this.props.author);
        }
    }

    loadAuthorInfo = (authorName) => {
        const info = authorsData[authorName] || null;
        this.setState({ author: info });
    };

    render() {
        const { author } = this.state;

        if (!author) {
            return (
                <div className="alert alert-info mt-3">Click on a book to view author details.</div>
            );
        }

        return (
            <div className="card mt-3 shadow-sm">
                <div className="card-body">
                    <h4 className="card-title text-primary">Author Details</h4>
                    <p><strong>Bio:</strong> {author.bio}</p>
                    <h6>Top 3 Books:</h6>
                    <ul>
                        {author.topBooks.map((book, idx) => (
                            <li key={idx}>{book}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default AuthorInfo;

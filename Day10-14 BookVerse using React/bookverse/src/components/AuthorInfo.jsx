// AuthorInfo.jsx
import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authorsData from "../data/authorsData";
import "bootstrap/dist/css/bootstrap.min.css";

/* Wrapper so class component can use hooks */
function AuthorInfoWrapper() {
    const { authorName } = useParams();
    const navigate = useNavigate();
    return <AuthorInfo authorName={authorName} navigate={navigate} />;
}

class AuthorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { author: null };
    }

    componentDidMount() {
        const { authorName } = this.props;
        if (authorName) {
            this.loadAuthorInfo(decodeURIComponent(authorName));
        }
    }

    loadAuthorInfo = (authorName) => {
        const info = authorsData[authorName] || null;
        this.setState({ author: info });
    };

    render() {
        const { author } = this.state;
        const { navigate } = this.props;

        if (!author) {
            return (
                <div className="alert alert-warning mt-5 text-center">
                    Author not found.
                    <br />
                    <button className="btn btn-secondary mt-3" onClick={() => navigate("/home")}>
                        Back to Home
                    </button>
                </div>
            );
        }

        return (
            <div className="container mt-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title text-primary">{decodeURIComponent(this.props.authorName)}</h3>
                        <p><strong>Bio:</strong> {author.bio}</p>
                        <h6><strong>Top 3 Books:</strong></h6>
                        <ul>
                            {author.topBooks.map((book, idx) => (
                                <li key={idx}>{book}</li>
                            ))}
                        </ul>
                        <button className="btn btn-dark mt-3" onClick={() => navigate("/home")}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorInfoWrapper;

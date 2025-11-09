// withLoader.jsx
// Higher Order Component to show a loading spinner during data fetch

import React from "react";

const withLoader = (WrappedComponent) => {
    return function WithLoaderComponent({ loading, ...props }) {
        if (loading) {
            return (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        return <WrappedComponent {...props} />;
    };
};

export default withLoader;

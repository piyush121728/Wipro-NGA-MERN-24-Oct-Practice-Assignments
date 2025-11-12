import React from "react";

// ErrorBoundary class component to catch runtime render errors in children
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-danger bg-opacity-10 p-4 rounded-3">
          <h2 className="text-danger fw-semibold mb-2">Something went wrong.</h2>
          <p className="text-muted mb-3">
            We're sorry — please refresh or contact support.
          </p>
          <details className="text-dark" style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.toString()}
            {this.state.info?.componentStack}
          </details>
        </div>

      );
    }
    return this.props.children;
  }
}

import React, { Component, ErrorInfo, ReactNode } from "react";

interface IErrorBounderyProps {
  children: ReactNode;
}

interface ErrorBounderyState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<IErrorBounderyProps, ErrorBounderyState> {
  constructor(props: IErrorBounderyProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBounderyState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      "There is an Error caught by Error Boundery:",
      error,
      errorInfo
    );
  }

  // The inline styling was written by Claude
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ff6b6b",
            borderRadius: "4px",
            backgroundColor: "#ffe0e0",
            color: "#d63031",
          }}
        >
          <h2>Something went wrong!</h2>
          <p>Error Boundery caught an error</p>
          {this.state.error && (
            <details>
              <summary>Error details</summary>
              <pre>{this.state.error.message}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

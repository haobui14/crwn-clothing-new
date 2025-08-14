import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | undefined;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 20px;
  text-align: center;
  background: var(--bg-primary);
`;

const ErrorTitle = styled.h2`
  color: var(--error-color, #d32f2f);
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background-color: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: var(--text-secondary);
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details style={{ marginTop: "16px", textAlign: "left" }}>
                <summary>Error details (development only)</summary>
                <pre style={{ marginTop: "8px", fontSize: "12px" }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>Try Again</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    /* Light mode colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #6c757d;
    --border-color: #dee2e6;
    --shadow: rgba(0, 0, 0, 0.1);
    --accent-primary: #667eea;
    --accent-secondary: #764ba2;
    --error-color: #d32f2f;
    --button-disabled: #adb5bd;
  }

  .dark-mode {
    /* Dark mode colors */
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
    --shadow: rgba(0, 0, 0, 0.3);
    --accent-primary: #8b9bff;
    --accent-secondary: #9c6dc5;
    --error-color: #ff6b6b;
    --button-disabled: #6c757d;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  html {
    scroll-behavior: smooth;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    text-decoration: none;
    color: var(--accent-primary);
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-secondary);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
  }

  button {
    font-family: 'Open Sans', sans-serif;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  input, textarea, select {
    font-family: 'Open Sans', sans-serif;
    outline: none;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%);
  }

  /* Selection styles */
  ::selection {
    background: rgba(102, 126, 234, 0.2);
    color: var(--text-primary);
  }

  ::-moz-selection {
    background: rgba(102, 126, 234, 0.2);
    color: var(--text-primary);
  }
`;

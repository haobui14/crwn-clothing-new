// Theme configuration with the new purple-blue color palette
export const theme = {
  colors: {
    // Primary gradient colors from home page
    primary: "#667eea",
    primaryDark: "#764ba2",

    // Neutral colors
    white: "#ffffff",
    black: "#1a1a1a",
    gray: {
      50: "#f8f9fa",
      100: "#e9ecef",
      200: "#dee2e6",
      300: "#ced4da",
      400: "#adb5bd",
      500: "#6c757d",
      600: "#495057",
      700: "#343a40",
      800: "#212529",
      900: "#1a1a1a",
    },

    // Accent colors
    accent: "#ff6b6b",
    success: "#51cf66",
    warning: "#ffd43b",
    error: "#ff6b6b",

    // Text colors
    text: {
      primary: "#1a1a1a",
      secondary: "#495057",
      light: "#6c757d",
      inverse: "#ffffff",
    },

    // Background colors
    background: {
      primary: "#ffffff",
      secondary: "#f8f9fa",
      dark: "#1a1a1a",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      gradientReverse: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    },

    // Border colors
    border: {
      light: "#e9ecef",
      medium: "#dee2e6",
      dark: "#495057",
    },
  },

  // Shadow system
  shadows: {
    small: "0 2px 8px rgba(102, 126, 234, 0.1)",
    medium: "0 4px 16px rgba(102, 126, 234, 0.15)",
    large: "0 8px 32px rgba(102, 126, 234, 0.2)",
    xlarge: "0 16px 64px rgba(102, 126, 234, 0.25)",
  },

  // Spacing system
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },

  // Border radius
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    round: "50%",
  },

  // Typography
  typography: {
    fontFamily: {
      primary: "'Open Sans', sans-serif",
      heading: "'Poppins', sans-serif",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "32px",
      "4xl": "40px",
      "5xl": "48px",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Transitions
  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },
} as const;

export type Theme = typeof theme;

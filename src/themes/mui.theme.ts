import { createTheme } from "@mui/material/styles";

export const createMuiTheme = (isDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#667eea",
        light: "#8b9bff",
        dark: "#764ba2",
      },
      secondary: {
        main: "#764ba2",
        light: "#9c6dc5",
        dark: "#667eea",
      },
      background: {
        default: isDarkMode ? "#1a1a1a" : "#ffffff",
        paper: isDarkMode ? "#2d2d2d" : "#ffffff",
      },
      text: {
        primary: isDarkMode ? "#ffffff" : "#000000",
        secondary: isDarkMode ? "#b0b0b0" : "#666666",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              "& fieldset": {
                borderColor: isDarkMode ? "#404040" : "#f3f3f7",
              },
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiInputLabel-root": {
              color: isDarkMode ? "#b0b0b0" : "#666666",
              "&.Mui-focused": {
                color: "#667eea",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: isDarkMode ? "#ffffff" : "#000000",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "#ffffff" : "#000000",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDarkMode ? "#404040" : "#f3f3f7",
          },
        },
      },
    },
  });

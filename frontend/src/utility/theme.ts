import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#1a1a1a",
    },
    secondary: {
      main: "#f5f7f9",
      light: "#f8fafb",
      dark: "#f2f2f2",
    },
    text: {
      primary: "#1a1a1aff",
      secondary: "#949494",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
        },
      },
    },
  },
});

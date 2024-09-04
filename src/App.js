import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Dashboard from "./components/Dashboard";
import PortfolioManagement from "./components/PortfolioManagement";
import TransactionManagement from "./components/TransactionManagement";
import Reconciliation from "./components/Reconciliation";
import Navigation from "./components/Navigation";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e88e5", // A professional blue
      light: "#6ab7ff",
      dark: "#005cb2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#43a047", // A calming green for finance
      light: "#76d275",
      dark: "#00701a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#263238",
      secondary: "#455a64",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .03)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex" }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/portfolio" component={PortfolioManagement} />
              <Route path="/transactions" component={TransactionManagement} />
              <Route path="/reconciliation" component={Reconciliation} />
            </Switch>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

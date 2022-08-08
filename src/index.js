import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { theme } from "./theme";
import { UserProvider } from "./contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </UserProvider>
  </React.StrictMode>
);

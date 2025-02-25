import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchContextProvider>
      <AuthProvider>
        <PlayerContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PlayerContextProvider>
      </AuthProvider>
    </SearchContextProvider>
  </StrictMode>
);

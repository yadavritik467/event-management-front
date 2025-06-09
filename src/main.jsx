import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contextApi/AuthContext.jsx";
import "./index.css";
import { EventProvider } from "./contextApi/EventContext.jsx";
import "./i18n";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </AuthProvider>
  </BrowserRouter>
);

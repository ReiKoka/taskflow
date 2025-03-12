import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";

import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { AllWorkspacesProvider } from "./context/AllWorkspacesContext";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <AllWorkspacesProvider>
              <App />
            </AllWorkspacesProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}

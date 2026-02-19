import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import { AuthProvider } from "@/contexts/AuthContext.jsx";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ConfirmationProvider } from "@/contexts/ConfirmationContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ConfirmationProvider>
                <NotificationProvider>
                    <App />
                </NotificationProvider>
            </ConfirmationProvider>
        </AuthProvider>
    </StrictMode>,
);

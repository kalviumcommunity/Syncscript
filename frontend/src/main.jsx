import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from "@clerk/themes"
import logo from './assets/logo.png'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" 
      appearance={{
        baseTheme: dark,
        layout: {
          helpPageUrl: "https://clerk.dev/support",
          logoImageUrl: {logo},
          privacyPageUrl: "https://clerk.dev/privacy",
          termsPageUrl: "https://clerk.dev/terms"
        },
        variables: {
          colorPrimary: "#3371FF",
          colorBackground: "#000000",
          colorText: "#ffffff",
          colorInputBackground: "#1a1a1a",
          colorInputText: "#ffffff",
          fontSize: '16px'
        }
      }}
      // routing="path"
      // signInUrl="/sign-in"
      // signUpUrl="/sign-up"
      >
        <App />
      </ClerkProvider>
    </BrowserRouter>
);

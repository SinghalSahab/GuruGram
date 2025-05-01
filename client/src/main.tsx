import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = import.meta.env.VITE_client_id|| "";
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Analytics/>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
)

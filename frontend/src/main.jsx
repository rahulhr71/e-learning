
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { NavbarProvider } from './context/navbarContext.jsx'
import { StrictMode } from 'react'
createRoot(document.getElementById('root')).render(
    <UserProvider>
    <NavbarProvider>
        <StrictMode>
        <App />
        </StrictMode>
    </NavbarProvider>
    </UserProvider>
)

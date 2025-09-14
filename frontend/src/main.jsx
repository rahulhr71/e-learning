
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { NavbarProvider } from './context/navbarContext.jsx'
import { StrictMode } from 'react'
import { CourseProvider } from './context/courseContext.jsx'  
import { BrowserRouter } from 'react-router-dom'  
createRoot(document.getElementById('root')).render(
    <UserProvider>
    <NavbarProvider>
        <CourseProvider>
        <StrictMode>
            <BrowserRouter>
        <App />
        </BrowserRouter>
        </StrictMode>
        </CourseProvider>
    </NavbarProvider>
    </UserProvider>
)

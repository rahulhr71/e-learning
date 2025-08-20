import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './pages/Dashboard';
import Courses from './components/Courses';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/courses' element={<CoursePage/> } />
        <Route path='/courses/:id' element={<Courses/>}/>
        <Route path="/blog" element={<div>Blog Page</div>} />
        <Route path="/page" element={<div>Contact Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/help" element={<div>Help Page</div>} />
        <Route path="/terms" element={<div>Terms and Conditions Page</div>} />
        <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;


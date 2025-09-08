import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './pages/Dashboard';
import Courses from './components/Courses';
import CoursePage from './pages/CoursePage';
import Contact from './components/Contact';
import CourseOverview from './pages/CourseOverview';
import NotesPage from './pages/NotesPage';
import AboutUs from './pages/About'

function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/courses' element={<CoursePage/> } />
        <Route path='courses/:id' element={<CourseOverview/>}/>
        <Route path="/blog" element={<div>Blog Page</div>} />
        <Route path="/notes" element={<NotesPage/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/terms" element={<div>Terms and Conditions Page</div>} />
        <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


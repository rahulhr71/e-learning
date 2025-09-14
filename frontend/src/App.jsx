import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import  { Route, Routes,Router } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import NotesPage from './pages/NotesPage';
import About from './pages/About';
import Contact from './components/Contact';
import TypingMaster from './components/Typing';
import CourseOverview from './pages/CourseOverview'
import Login from './auth/Login';
import Register from './auth/Register';
import CourseEnrollmentPage from './components/Enrolled'
function App() {
return (
  <>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/courses" element={<CoursePage />} />
    <Route path="/notes" element={<NotesPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/typing" element={<TypingMaster />} />
    <Route path='/courses/:id' element={<CourseOverview />} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='enrolled-courses' element={<CourseEnrollmentPage/>}/>
  </Routes>
  
  </>
  
);
}

export default App;
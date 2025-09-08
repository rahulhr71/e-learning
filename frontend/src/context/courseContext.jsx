import React, { createContext, useContext, useState, useEffect } from 'react';
import {api} from '../api/api';
const CourseContext = createContext();
export const useCourseContext = () => useContext(CourseContext);
export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
   useEffect(() => {
    
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const cachedCourses = localStorage.getItem("courses");
      if (cachedCourses) {
        setCourses(JSON.parse(cachedCourses));
        setLoading(false); 
      }

      const response = await api.get('/courses/getcourse'); 
      setCourses(response.data.data);

      localStorage.setItem("courses", JSON.stringify(response.data.data));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);


    return (
        <CourseContext.Provider value={{ courses, loading, error }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourse = () => useContext(CourseContext);


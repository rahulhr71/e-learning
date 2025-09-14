import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/api';
import {jwtDecode} from 'jwt-decode';   

const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

 
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [token]);

 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const cachedCourses = localStorage.getItem("courses");
        if (cachedCourses) {
          setCourses(JSON.parse(cachedCourses));
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
    <CourseContext.Provider value={{ 
      courses, 
      loading, 
      error, 
      enrolledCourses, 
      setEnrolledCourses, 
      token, 
      user 
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);

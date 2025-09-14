import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Users, Star, CheckCircle, User, GraduationCap, Award } from 'lucide-react';
import Navbar from './Navbar';
const CourseEnrollmentPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const id = "6502b500f4c8f7a2c1234568";
    useEffect(() => {
       
        const fetchEnrolledCourses = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/courses/my-courses/${id}`); {
                    if (!response.ok) {
                        
                        
                        throw new Error('Network response was not ok');
                    }
                    
                    const data = await response.json();
                    console.log(data);
                    setEnrolledCourses(data.courses);
                }
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };
        fetchEnrolledCourses();
    }, []);


  return (
        <div className="">
            <Navbar /><br /><br /><br /><br />
            <h1 className="text-3xl font-bold mb-6">Enrolled Courses</h1>
            <p className="text-lg">You are enrolled in the following courses:</p>
            <ul className="mt-4 space-y-4">
                {/* Example enrolled course item */}
                <li className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold">Course Title</h2>
                    <p className="text-gray-600">Brief description of the course.</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                            <BookOpen size={16} />
                            <span>10 Lessons</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>5 Hours</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Users size={16} />
                            <span>200 Students</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Star size={16} />
                            <span>4.5 Rating</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <CheckCircle size={16} />
                            <span>Certificate Available</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <User size={16} />
                            <span>Instructor Name</span>
                        </span>
                        <span className="flex items-center space-x-1">

                            <GraduationCap size={16} />
                            <span>Intermediate Level</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Award size={16} />
                            <span>Accredited Course</span>
                        </span>
                    </div>
                </li>
                {/* Repeat for other enrolled courses */}
            </ul>
                
    </div>
  );
};

export default CourseEnrollmentPage;
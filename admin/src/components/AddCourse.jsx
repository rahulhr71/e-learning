import React, { useState } from "react";
import api from "../utility/api";
import ChapterWiseVideoUpload from "./UploadVideo";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



export default function AddCourse() {
    const steps = ["Add New Course", "Video Upload", "Publish Course"];

const categories = [
    "Art & Design",
    "Development",
    "Communication",
    "Videography",
    "Photography",
    "Marketing",
    "Content Writing",
    "Finance",
    "Science",
    "Network",
];
    const [courseId, setCourseId] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: "",
        category: "",
        teacher: "",
        weeks: "",
        students: "",
        basePrice: "",
        discountPrice: "",
        thumbnail: "",
        lessons: "",
    });

    const handleChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    };

 
    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!newCourse.name || !newCourse.teacher) {
            alert("Course name & teacher are required!");
            return;
        }
        try {
            setLoading(true);
            const res = await api.post("/courses/addcourse", newCourse);

            if (res.status === 201 || res.status === 200) {
                alert("Course added successfully!");
                setCourseId(res.data.course._id);
                setActiveStep(1);
                setNewCourse({
                    name: "",
                    category: "",
                    teacher: "",
                    weeks: "",
                    students: "",
                    basePrice: "",
                    discountPrice: "",
                    thumbnail: "",
                    lessons: "",
                });
                setActiveStep(1); // move to video upload step
            }
        } catch (error) {
            alert(" Failed to add course: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <Box sx={{ width: "100%", mb: 3 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {activeStep === 0 && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Add New Course
                        </Typography>

                        <form onSubmit={handleAddCourse}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                <TextField
                                    label="Course Name"
                                    name="name"
                                    value={newCourse.name}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    select
                                    label="Category"
                                    name="category"
                                    value={newCourse.category}
                                    onChange={handleChange}
                                    required
                                >
                                    {categories.map((cat, i) => (
                                        <MenuItem key={i} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Teacher"
                                    name="teacher"
                                    value={newCourse.teacher}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="Weeks"
                                    name="weeks"
                                    value={newCourse.weeks}
                                    onChange={handleChange}
                                />
                                <TextField
                                    type="number"
                                    label="Students"
                                    name="students"
                                    value={newCourse.students}
                                    onChange={handleChange}
                                />
                                <TextField
                                    type="number"
                                    label="Base Price"
                                    name="basePrice"
                                    value={newCourse.basePrice}
                                    onChange={handleChange}
                                />
                                <TextField
                                    type="number"
                                    label="Discount Price"
                                    name="discountPrice"
                                    value={newCourse.discountPrice}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Thumbnail URL"
                                    name="thumbnail"
                                    value={newCourse.thumbnail}
                                    onChange={handleChange}
                                />
                                <TextField
                                    type="number"
                                    label="Lessons"
                                    name="lessons"
                                    value={newCourse.lessons}
                                    onChange={handleChange}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ mt: 3 }}
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add Course"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}


            {activeStep === 1 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Upload Course Videos
                        </Typography>
                        <ChapterWiseVideoUpload courseId={courseId} />  
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={() => setActiveStep(2)}
                        >
                            Continue to Publish
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Step 3: Publish */}
            {activeStep === 2 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Review & Publish
                        </Typography>
                        <Typography variant="body1">
                            Your course is ready. You can now publish it.
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3 }}
                            onClick={() => alert("Course Published ")}
                        >
                            Publish Course
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

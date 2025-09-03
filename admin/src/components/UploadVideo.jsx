import React, { useState } from "react";
import api from "../utility/api";

export default function ChapterWiseVideoUpload({ courseId }) {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");

  const handleUpload = async () => {
    if (!courseId) {
      alert("Please add course first!");
      return;
    }
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("courseId", courseId); // 

    try {
      const res = await api.post("/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201)
        
      alert(" Video uploaded successfully!");
    } catch (error) {
      alert("Failed to upload video: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}

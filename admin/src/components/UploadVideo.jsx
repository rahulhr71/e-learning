import React, { useState } from "react";
import api from "../utility/api";
import LinearProgress from "@mui/material/LinearProgress";

export default function ChapterWiseVideoUpload({ courseId }) {
  const [chapters, setChapters] = useState([]);

  // ✅ Add new chapter
  const addChapter = () => {
    setChapters([
      ...chapters,
      { name: `Chapter ${chapters.length + 1}`, isEditing: false, videos: [] },
    ]);
  };

  // ✅ Toggle edit chapter name
  const toggleEditChapter = (chapterIndex) => {
    const updated = [...chapters];
    updated[chapterIndex].isEditing = !updated[chapterIndex].isEditing;
    setChapters(updated);
  };

  // ✅ Change chapter name
  const handleChapterNameChange = (chapterIndex, value) => {
    const updated = [...chapters];
    updated[chapterIndex].name = value;
    setChapters(updated);
  };

  // ✅ Remove chapter
  const removeChapter = (chapterIndex) => {
    const updated = chapters.filter((_, i) => i !== chapterIndex);
    setChapters(updated);
  };

  // ✅ Select videos for a chapter
  const handleFileChange = (chapterIndex, e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      title: file.name.split(".")[0],
      isEditing: false,
      uploading: false,
      progress: 0,
    }));

    const updated = [...chapters];
    updated[chapterIndex].videos.push(...newVideos);
    setChapters(updated);
  };

  // ✅ Toggle edit video name
  const toggleEditVideo = (chapterIndex, videoIndex) => {
    const updated = [...chapters];
    updated[chapterIndex].videos[videoIndex].isEditing =
      !updated[chapterIndex].videos[videoIndex].isEditing;
    setChapters(updated);
  };

  // ✅ Change video title
  const handleTitleChange = (chapterIndex, videoIndex, value) => {
    const updated = [...chapters];
    updated[chapterIndex].videos[videoIndex].title = value;
    setChapters(updated);
  };

  // ✅ Remove video from chapter
  const removeVideo = (chapterIndex, videoIndex) => {
    const updated = [...chapters];
    updated[chapterIndex].videos = updated[chapterIndex].videos.filter(
      (_, i) => i !== videoIndex
    );
    setChapters(updated);
  };

  // ✅ Upload single video with progress
  const handleUpload = async (chapterIndex, videoIndex) => {
    if (!courseId) {
      alert("Please add course first!");
      return;
    }

    const video = chapters[chapterIndex].videos[videoIndex];
    const formData = new FormData();
    formData.append("video", video.file);
    formData.append("title", video.title);
    formData.append("chapter", chapters[chapterIndex].name);
    formData.append("courseId", courseId);

    try {
      const updated = [...chapters];
      updated[chapterIndex].videos[videoIndex].uploading = true;
      updated[chapterIndex].videos[videoIndex].progress = 0;
      setChapters(updated);

      const res = await api.post("/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          const progressUpdated = [...chapters];
          progressUpdated[chapterIndex].videos[videoIndex].progress = percent;
          setChapters(progressUpdated);
        },
      });

      if (res.status === 201) {
        alert("✅ Video uploaded successfully!");
      }
    } catch (error) {
      alert("❌ Failed to upload: " + error.message);
    } finally {
      const updated = [...chapters];
      updated[chapterIndex].videos[videoIndex].uploading = false;
      setChapters(updated);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={addChapter}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        ➕ Add Chapter
      </button>

      {chapters.map((chapter, chapterIndex) => (
        <div
          key={chapterIndex}
          className="mb-6 p-4 border rounded bg-gray-50 shadow"
        >
          <div className="flex justify-between items-center mb-4">
            {chapter.isEditing ? (
              <input
                type="text"
                value={chapter.name}
                onChange={(e) =>
                  handleChapterNameChange(chapterIndex, e.target.value)
                }
                className="border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 bg-transparent p-1 flex-1"
              />
            ) : (
              <h2 className="text-lg font-semibold">{chapter.name}</h2>
            )}
            <div className="space-x-2">
              <button
                onClick={() => toggleEditChapter(chapterIndex)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                {chapter.isEditing ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => removeChapter(chapterIndex)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>

          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => handleFileChange(chapterIndex, e)}
            className="mb-4 border p-2 rounded w-full"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {chapter.videos.map((vid, videoIndex) => (
              <div
                key={videoIndex}
                className="p-3 bg-white rounded shadow border"
              >
                {vid.isEditing ? (
                  <input
                    type="text"
                    value={vid.title}
                    onChange={(e) =>
                      handleTitleChange(chapterIndex, videoIndex, e.target.value)
                    }
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <p className="font-medium">{vid.title}</p>
                )}

                {vid.uploading && (
                  <div className="mt-2">
                    <LinearProgress
                      variant="determinate"
                      value={vid.progress}
                    />
                    <p className="text-sm mt-1">{vid.progress}%</p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-2">
                  <div className="space-x-2">
                    <button
                      onClick={() => toggleEditVideo(chapterIndex, videoIndex)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      {vid.isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                      onClick={() => removeVideo(chapterIndex, videoIndex)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>

                  <button
                    onClick={() => handleUpload(chapterIndex, videoIndex)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    disabled={vid.uploading}
                  >
                    {vid.uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

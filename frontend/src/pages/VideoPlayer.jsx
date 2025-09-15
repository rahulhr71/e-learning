import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  CheckCircle, 
  Clock,
  BookOpen,
  List,
  Eye,
  PlayCircle
} from 'lucide-react';
import { fetchCourse } from '../api/api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


const VideoPlayerPage = () => {
  const [courseVideos, setCourseVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [videoProgress, setVideoProgress] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState(null);
  const { id } = useParams()
  const videoRef = useRef(null);
  const progressRef = useRef(null);


  
  useEffect(() => {

    const fetchCourseVideos = async () => {
      setLoading(true);
      try {
               const res = await fetchCourse(id);
          const data = res.data.videos || [];
          console.log(res.data.videos)
         setCourseVideos(data);
        setCurrentVideo(data[0]);
        setCourseInfo({
          name: "Complete React Development Course",
          teacher: "John Doe",
          totalVideos: courseVideos.length
        });

        const savedWatched = JSON.parse(localStorage.getItem('watchedVideos') || '[]');
        setWatchedVideos(new Set(savedWatched));


        const savedProgress = JSON.parse(localStorage.getItem('videoProgress') || '{}');
        setVideoProgress(savedProgress);

      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseVideos();
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      
      setCurrentTime(current);
      setDuration(total);

     
      const progress = (current / total) * 100;
      const newProgress = {
        ...videoProgress,
        [currentVideo._id]: progress
      };
      setVideoProgress(newProgress);
      localStorage.setItem('videoProgress', JSON.stringify(newProgress));

      if (progress > 80 && !watchedVideos.has(currentVideo._id)) {
        const newWatched = new Set([...watchedVideos, currentVideo._id]);
        setWatchedVideos(newWatched);
        localStorage.setItem('watchedVideos', JSON.stringify([...newWatched]));
      }
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const newTime = percentage * duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const selectVideo = (video) => {
    setCurrentVideo(video);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCompletionPercentage = () => {
    const totalVideos = courseVideos.length;
    const watchedCount = watchedVideos.size;
    return totalVideos > 0 ? Math.round((watchedCount / totalVideos) * 100) : 0;
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading course videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/> <br /> <br />
        <br />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 text-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold">
              {courseInfo?.name}
            </h1>
          </div>
          <p className="text-gray-600">by {courseInfo?.teacher}</p>
          <div className="mt-4 bg-white shadow-sm rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm font-semibold text-blue-600">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {watchedVideos.size} of {courseVideos.length} videos completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
       
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl overflow-hidden  shadow-lg border">
              {currentVideo && (
                <>
                  <div className="relative aspect-video bg-black">
                    <video
                      ref={videoRef}
                      src={currentVideo.url}
                      className="w-full h-full object-cover"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          setDuration(videoRef.current.duration);
                          const savedProgress = videoProgress[currentVideo._id] || 0;
                          const savedTime = (savedProgress / 100) * videoRef.current.duration;
                          if (savedTime > 0) {
                            videoRef.current.currentTime = savedTime;
                          }
                        }
                      }}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="w-20 h-20 text-white" />
                      ) : (
                        <Play className="w-20 h-20 text-white" />
                      )}
                    </div>

                    <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                      <h3 className="font-semibold">{currentVideo.title}</h3>
                    </div>

                    {watchedVideos.has(currentVideo._id) && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="p-4 bg-gray-800">
                    {/* Progress Bar */}
                    <div 
                      ref={progressRef}
                      className="w-full bg-gray-600 rounded-full h-2 mb-4 cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-150"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handlePlayPause}
                          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </button>
                        
                        <div className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-white" />
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.1"
                          value={volume}
                          onChange={(e) => {
                            const newVolume = parseFloat(e.target.value);
                            setVolume(newVolume);
                            if (videoRef.current) {
                              videoRef.current.volume = newVolume;
                            }
                          }}
                          className="w-20"
                        />
                        <Maximize className="w-5 h-5 text-white cursor-pointer hover:text-blue-300" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-2xl p-6 border">
              <div className="flex items-center gap-3 mb-6">
                <List className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Course Videos</h2>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {courseVideos.map((video, index) => (
                  <div
                    key={video._id}
                    onClick={() => selectVideo(video)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      currentVideo?._id === video._id
                        ? 'bg-blue-50 border-blue-300 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {watchedVideos.has(video._id) ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                          {video.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(video.duration || 0)}</span>
                          {watchedVideos.has(video._id) && (
                            <span className="text-green-500 font-medium">✓ Completed</span>
                          )}
                        </div>

                        {/* Progress bar for each video */}
                        {videoProgress[video._id] && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-600 h-1 rounded-full"
                                style={{ width: `${videoProgress[video._id]}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{watchedVideos.size}</div>
                    <div className="text-xs text-green-700">Watched</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{courseVideos.length - watchedVideos.size}</div>
                    <div className="text-xs text-blue-700">Remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
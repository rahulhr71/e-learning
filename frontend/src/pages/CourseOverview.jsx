import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Collapse } from 'antd'
import { useParams } from 'react-router-dom'
import { thumbnail } from '../assets/thumbnails/thumbnail'
import { GraduationCap, BarChart2, FileText, BookOpen, Users, Play } from "lucide-react"
import { fetchCourse } from '../api/api'
import { Clock, Calendar } from "lucide-react"; // extra icons for duration & date
const CourseOverview = () => {
    const { id } = useParams()
    const [course, setCourse] = useState([])
    const [activeLesson, setActiveLesson] = useState(null)
    const [activeTab, setActiveTab] = useState("overview")
    const [video, setVideo] = useState("")

    const handleClick = (url, key) => {
        setActiveLesson(key)
        setVideo(url)
    }

    useEffect(() => {
        fetchCourse(id)
            .then(res => {
                console.log(res.data.videos);
                
                const data = res.data.videos
                console.log(data);
                
                setCourse(data)
                if (data?.lessons?.length > 0) {
                    const sortedLessons = [...data.lessons].sort((a, b) => a.order - b.order)
                    sortedLessons.forEach(lesson => {
                        lesson.children.sort((a, b) => a.order - b.order)
                    })
                    setLessons(sortedLessons)
                    if (sortedLessons[0]?.children?.[0]) {
                        setVideo(sortedLessons[0].children[0].url)
                        setActiveLesson(sortedLessons[0].children[0].name)
                    }
                }
            })
            .catch(err => console.log(err))
    }, [id])

   const items = course.map((video, index) => ({
  key: video._id,
  label: (
    <div className="flex justify-between items-center">
      <span className="font-medium text-gray-800">
        {video.title || `Chapter ${index + 1}`}
      </span>
      <span className="text-xs text-gray-500">
        {new Date(video.createdAt).toLocaleDateString()}
      </span>
    </div>
  ),
  children: (
    <div
      key={video._id}
      className={`flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg border ${
        activeLesson === video._id
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-200 bg-white"
      } hover:shadow-md transition`}
    >
      {/* Video Info */}
      <div className="flex flex-col gap-1 w-full">
        <span
          className={`${
            activeLesson === video._id
              ? "text-blue-800 font-semibold"
              : "text-gray-700"
          } text-sm`}
        >
          {video.title}
        </span>
        <div className="flex gap-4 text-xs text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <Clock size={12} /> 5 min {/* Future: duration field */}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={() => handleClick(video.url, video._id)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition text-sm mt-3 sm:mt-0"
      >
        <Play size={16} /> {activeLesson === video._id ? "Playing" : "Play"}
      </button>
    </div>
  ),
}));


    const FAQs = [
        {
            key: '1',
            label: 'What Does Royalty Free Mean?',
            children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum culpa veniam quia architecto?"]
        },
        {
            key: '2',
            label: 'How long does the course last?',
            children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum culpa veniam quia architecto?"]
        }
    ]

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <div className='flex items-center h-[60px] bg-[#F5F5F5] px-4 sm:px-8'>
                <h1 className='text-[#555555] text-sm sm:text-base'>
                    Course &gt;<span className='text-[#9D9D9D]'> {id}</span>
                </h1>
            </div>

            <div className='w-full bg-black flex flex-col lg:flex-row justify-center items-center gap-6 p-4 lg:p-10'>
   
                <div className='flex flex-col gap-4 lg:w-2/3 w-full'>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <p className='text-white bg-[#555555] p-1 rounded-sm text-xs sm:text-sm'>Category</p>
                        <h1 className='text-gray-300 text-sm sm:text-base'>by {course.teacher || "Teacher Name"}</h1>
                    </div>
                    <h1 className='text-white font-bold text-xl sm:text-3xl'>{course.title || "Course Title"}</h1>
                    <div className="flex flex-wrap gap-3 text-orange-500 text-sm mt-2">
                        <div className="flex items-center gap-1"><span>●</span><span className='text-white'>2 Weeks</span></div>
                        <div className="flex items-center gap-1"><GraduationCap size={16} /><span className='text-white'>156 Students</span></div>
                        <div className="flex items-center gap-1"><BarChart2 size={16} /><span className='text-white'>All levels</span></div>
                        <div className="flex items-center gap-1"><FileText size={16} /><span className='text-white'>{course.length} Lessons</span></div>
                        <div className="flex items-center gap-1"><BookOpen size={16} /><span className='text-white'>Quizzes</span></div>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-2 border rounded-2xl border-gray-400 lg:w-1/3 w-full'>
                    <img src={thumbnail.i1} alt="" className='w-full lg:w-full rounded-lg' />
                    <div className='flex flex-wrap gap-4 py-3 justify-center'>
                        <p className='text-white text-sm'><span className='line-through text-gray-500'>₹100</span> ₹70</p>
                        <button className='bg-amber-500 py-1 px-4 cursor-pointer hover:bg-amber-600 rounded-2xl text-white font-medium'>Start Now</button>
                    </div>
                </div>
            </div>

            <div className='w-full sm:w-4/5 m-auto mt-10'>
                <ul className="flex flex-wrap w-full items-center text-black font-Exo font-medium text-sm rounded-t-lg border-b border-gray-300">
                    {["Overview", "Curriculum", "Instructor", "FAQs", "Review"].map((item, index) => (
                        <li
                            onClick={() => setActiveTab(item.toLowerCase())}
                            key={index}
                            className={`flex-1 text-center py-3 cursor-pointer transition-colors ${activeTab === item.toLowerCase() ? "text-orange-500 bg-[#EAEAEA]" : "text-black hover:bg-[#EAEAEA]"}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <div className='p-4 bg-[#EAEAEA] rounded-b-lg text-[#555555]'>
                    {activeTab === "overview" && <Overview />}
                    {activeTab === "curriculum" && (
                        <div>
                            {video && <video controls autoPlay muted loop playsInline width="100%" src={video} className='rounded-lg mb-4'></video>}
                            <Collapse accordion items={items} />
                        </div>
                    )}
                    {activeTab === "instructor" && (
                        <div className='flex flex-col sm:flex-row gap-4 items-center'>
                            <img src={thumbnail.i1} alt="" className='w-40 rounded-lg' />
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xl font-bold'>Instructor Name</h1>
                                <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                                <div className='flex gap-2 items-center'><Users size={16} /><span>156 Students</span></div>
                                <div className='flex gap-2 items-center'><span className='text-gray-500'>Rating: </span><span className='text-yellow-500'>★★★★☆</span></div>
                            </div>
                        </div>
                    )}
                    {activeTab === "faqs" && <Collapse accordion items={FAQs} />}
                    {activeTab === "review" && (
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-gray-500 font-Exo text-xl'>Reviews</h1>
                            {["User 1", "User 2", "User 3"].map((user, idx) => (
                                <div key={idx} className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>{user}</h2>
                                    <p className='text-gray-500'>This course was amazing! I learned so much.</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CourseOverview

const Overview = () => (
    <div className='text-gray-700 text-sm sm:text-base leading-6'>
        <p>
            Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptates reprehenderit obcaecati?sit amet consectetur adipisicing elit. Officiis provident eius laudantium perferendis culpa maiores eligendi facilis suscipit eaque libero?
        </p>
    </div>
)

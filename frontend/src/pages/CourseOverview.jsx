import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Collapse } from 'antd';
import { useParams } from 'react-router-dom'
import { thumbnail } from '../assets/thumbnails/thumbnail'
import { GraduationCap, BarChart2, FileText, BookOpen, Users, Play } from "lucide-react";
import Footer from '../components/Footer'
const CourseOverview = () => {
    const { id } = useParams();
    const [active, setactive] = useState("overview")
    const [video, setvideo] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nihil perferendis similique?"
    const handleClick = (items) => {
        setvideo(items)
    }
    const lessons = [
        {
            key: '1',
            title: 'Introduction',
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        {
            key: '2',
            title: 'Lesson 2',
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        }
    ];
    const items = lessons.map(lesson => ({
        key: lesson.key,
        label: lesson.title,
        children: (
            <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                <h2 className="text-base font-medium text-gray-800">{lesson.title}</h2>
                <button
                    onClick={() => handleClick(lesson.url)}
                    className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition text-sm"
                >
                    <Play size={16} />
                    Play
                </button>
            </div>
        )
    }));
    // const items = [
    //     {
    //         key: '1',
    //         label: 'Lesson with video content',
    //         url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    //         children: (
    //             < div >
    //                 <h2>Introduction</h2>
    //                 <button className="bg-amber-700 p-1 rounded-sm" onClick={()=>handleclick()}>Play</button>
    //             </div >
    //         ),
    //     },
    //     {
    //         key: '2',
    //         label: 'This is  header 2',
    //         children: <p>{text}</p>,
    //     },
    //     {
    //         key: '3',
    //         label: 'This is panel header 3',
    //         children: <p>{text}</p>,
    //     },
    // ];
    return (
        <div>
            <Navbar />
            <div className='flex items-center h-[60px] bg-[#F5F5F5]'>
                <h1 className='text-[#555555] ml-30'>Course &gt;<span className='text-[#9D9D9D]'>{id}</span> &nbsp; </h1>
            </div>
            <div className='w-full h-[200px] flex  items-center bg-black'>
                <div className='w-4/5 m-auto'>
                    <div className='flex gap-4 items-center'>
                        <p className='text-white bg-[#555555] p-1 rounded-sm'>Photography</p>
                        <h1 className='text-gray-300 '>by {"teacher name"}</h1>
                    </div>
                    <div className='flex  gap-2 mt-4'>
                        <div className='flex flex-col gap-2 '>
                            <h1 className='font-Exo text-3xl w-170 space-x-2  text-white '>The Ultimate Guide to the best WordPress LMS Plugin</h1>
                            <div className="flex gap-3 text-orange-500 text-sm">

                                <div className="flex items-center gap-1">
                                    <span className="text-orange-500">●</span>
                                    <span className="text-white">2 Weeks</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <GraduationCap size={16} />
                                    <span className="text-white">156 Students</span>
                                </div>


                                <div className="flex items-center gap-1">
                                    <BarChart2 size={16} />
                                    <span className="text-white">All levels</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <FileText size={16} />
                                    <span className="text-white">20 Lessons</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <BookOpen size={16} />
                                    <span className="text-white">Quizzes</span>
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-col items-center gap-2 border rounded-2xl border-gray-400'>
                            <img src={thumbnail.i1} alt="" width={250} />
                            <div className='flex gap-4 py-3'>
                                <p> <span className='line-through text-gray-500'> ₹100</span >  ₹70</p>
                                <button className='bg-amber-500 py-1 px-2 cursor-pointer hover:bg-amber-600 rounded-2xl text-white '>Start Now </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tabs Section */}
            <div className='w-4/5 m-auto mt-10 '>
                <div className=' w-2/3'>
                    <div className="w-full ">
                        <ul className="flex w-full items-center    text-black  font-Exo font-medium text-sm rounded-t-lg ">
                            {["Overview", "Curriculum", "Instructor", "FAQs", "Review"].map((item, index) => (
                                <li
                                    onClick={() => setactive(item.toLowerCase())}
                                    key={index}
                                    className={` ${item.toLocaleLowerCase() === active ? `text-orange-500 bg-[#EAEAEA]` : `text-black`} flex-1 text-center py-3 border border-gray-300 cursor-pointer hover:bg-[#EAEAEA] transition-colors `}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className='p-2  bg-[#EAEAEA] rounded-b-lg text-[#555555]'>
                            {active === "overview" && <Overview />}

                            {active === "curriculum" && (<div><video controls width="100%" autoPlay="true" src={video} className='rounded-lg mb-4'></video><Collapse accordion items={items} /> </div>)}
                            {active === "instructor" && <div className='flex gap-4 items-center'>

                                <img src={thumbnail.i1} alt="" width={100} />
                                <div className='flex flex-col'>
                                    <h1 className='text-xl font-bold'>Instructor Name</h1>
                                    <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                                    <div className='flex gap-2 items-center'>
                                        <Users size={16} />
                                        <span>156 Students</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='text-gray-500'>Rating: </span>
                                        <span className='text-yellow-500'>★★★★☆</span>
                                    </div>
                                </div>
                            </div>}
                            {active === "faqs" && <div className='flex flex-col gap-4'>
                                <h1 className='text-gray-500 font-Exo text-xl'>Frequently Asked Questions</h1>
                                <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                                <div className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>Question 1: What is the course duration?</h2>
                                    <p className='text-gray-500'>Answer: The course duration is 2 weeks.</p>
                                </div>
                                <div className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>Question 2: Are there any prerequisites?</h2>
                                    <p className='text-gray-500'>Answer: No, there are no prerequisites for this course.</p>
                                </div>
                                <div className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>Question 3: What is the course fee?</h2>
                                    <p className='text-gray-500'>Answer: The course fee is ₹70 after discount.</p>
                                </div>
                            </div>}
                            {active === "review" && <div className='flex flex-col gap-4'>
                                <h1 className='text-gray-500 font-Exo text-xl'>Reviews</h1>
                                <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                                <div className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>User 1</h2>
                                    <p className='text-gray-500'>This course was amazing! I learned so much.</p>
                                </div>
                                <div className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>User 2</h2>
                                    <p className='text-gray-500'>Great content and easy to follow.</p>
                                </div>
                                <div className='border p-3 rounded-lg'>
                                    <h2 className='font-bold'>User 3</h2>
                                    <p className='text-gray-500'>Highly recommend this course to everyone.</p>
                                </div>
                            </div>}


                        </div>

                    </div>
                </div>
            </div>
            {/* Comment Section */}
            <div >
                <div className='w-4/5 m-auto mt-10'>
                    <h1 className='text-gray-500 font-Exo text-xl'>Leave a comment</h1>
                    <p>Your email address will not be published. Required fields are marked *</p><br />
                    <form className='w-2/3 grid grid-cols-1 grid-rows-2 p-3  '>
                        <div className='flex gap-5'> <input type="text" placeholder="Name*" className='px-3 placeholder:text-gray-400 h-10 focus:border-0 border border-gray-400 rounded-sm flex-1' />
                            <input type="email" placeholder="Email*" className='flex-1 px-3 placeholder:text-gray-400 border border-gray-400 h-10 rounded-sm ' />
                        </div>
                        <textarea name="comment" id="" placeholder='Comment' className='p-4 placeholder:text-gray-400 h-20 border border-gray-400 rounded-sm '></textarea>
                        <button className='ml-0 bg-amber-600 p-3 m-5 rounded-2xl text-white font-bold cursor-pointer hover:bg-amber-500' onClick={(e) => e.preventDefault()}>Post Comment</button>
                    </form>
                    <br /><br />
                </div>
            </div>
            {/* Footer Section */}
            <Footer />
        </div>

    )
}

export default CourseOverview
const Overview = () => {
    return (
        <div>
            <p >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis provident eius laudantium perferendis culpa maiores eligendi facilis suscipit eaque libero? Accusamus tempore facere alias dolorem nihil a laboriosam explicabo, numquam adipisci, blanditiis tenetur? Beatae quibusdam inventore tenetur iste. Voluptatem, sequi unde deleniti voluptatum quidem consequatur dolorum molestias aspernatur facere saepe iste facilis quia, fugiat adipisci. Ut consequuntur tempora, asperiores ducimus accusamus natus quo facilis, corporis quasi amet deserunt esse, voluptatum quod saepe illum aperiam distinctio eius. Corrupti eius cupiditate et eligendi molestias a iste, iure doloremque vero repellendus tenetur provident eveniet quaerat distinctio sunt deleniti enim sequi, libero, atque voluptatum?
            </p>
        </div>
    );
}
const Curriculum = () => {

    return (
        <div>
            <h1 className='text-gray-500 font-Exo text-xl'>Curriculum</h1>
            <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            <div className='flex gap-4 mt-5'>
                <div className='w-1/3 border rounded-lg p-3'>
                    <h2 className='font-bold'>Lesson 1: Introduction</h2>
                    <p className='text-gray-500'>Duration: 30 mins</p>
                </div>
                <div className='w-1/3 border rounded-lg p-3'>
                    <h2 className='font-bold'>Lesson 2: Advanced Topics</h2>
                    <p className='text-gray-500'>Duration: 45 mins</p>
                </div>
            </div>
        </div>
    );
}
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Cateories from "../components/Cateories"
import Courses from "../components/Courses"
import Banner from "../components/Banner"
import Frame1 from "../components/Frame1"
import Frame2 from "../components/Frame2"
import Frame3 from "../components/Frame3"
import Feedback from "../components/Feedback"
import Frame4 from "../components/Frame4"
import Footer from "../components/Footer"
import Comment from "../components/comment"
import { useRef } from "react"
export default function Homepage() {
  const commentRef = useRef(null);
  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="font-Exo w-full">
      <Navbar /><br />
      <Hero scrollToComment={scrollToComment}  />
      <Cateories /><br />
      <Courses />
      <br />
      <Banner />
      <br />
      <Frame1 />
      <br />
      <Frame2 />
      <br />
      <Frame3 />
      <br />
      <Feedback />
      <br />
      <Frame4 />
      <br />
      <br />
       <div ref={commentRef}>
        <Comment />
      </div>
      <Footer />

    </div>
  )
}

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Cateories from "../components/Cateories"
import Courses from "../components/Courses"
import Banner from "../components/Banner"
import Frame1 from "../components/Frame1"
import Frame2 from "../components/Frame2"
import Frame3 from "../components/Frame3"
import PaginationExample from "../components/Pg"
import Feedback from "../components/Feedback"
import Frame4 from "../components/Frame4"
import Footer from "../components/Footer"
export default function Homepage() {
  return (
    <div className="font-Exo w-full">
      <Navbar /><br />
      <Hero />
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
      <Frame4/>
      <br />
      
      <Footer />
     
    </div>
  )
}

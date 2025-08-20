import Logo from '../assets/logo.png'
import { useState,useContext } from 'react'
import search from '../assets/search.png'
import { Link } from 'react-router-dom';
import  {useNavbar} from '../context/navbarContext'
export default function Navbar() {
  const {active, setActive} = useNavbar();
  const items = [
    { name: "Home", link: "/", active: true },
    { name: "Courses", link: "/courses", active: false },
    { name: "Blog", link: "/blog", active: false },
    { name: "Page", link: "/page", active: false },
    { name: "LearnPress Add-On", link: "/LearnPressAdd-On", active: false },
    { name: "Prenium Theme", link: "/PreniumTheme", active: false },
  ]
  return (
    <div>
      <div className=' w-full h-[72px] flex shadow-2xl'>
        <div className='w-[80%] bg-white  flex justify-between items-center m-auto '>
          <img src={Logo} alt="logo" width={130} className='cursor-pointer' />
          <div>
            <nav>
              <ul className='flex gap-5 font-Exo font-semibold text-sm'>
                {
                  items.map((item, index) => {
                    return (
                      <Link to={item.link} key={index}>
                        <li className={`hover:bg-[#F5F5F5] p-2 cursor-pointer hover:text-[#ff772e] ${active === item.name ? "text-[#ff772e]" : "text-gray-600"}`} key={index} onClick={() => { setActive(item.name) }} >{item.name}</li>
                      </Link>
                    )
                  })
                }
              </ul>
            </nav>
          </div>
          <div className='flex gap-5'>
            <div className='flex gap-3 font-Exo font-semibold text-sm'>
              <Link to={'/login'}><button className='cursor-pointer hover:text-[#ff772e]'>Login /</button></Link>
              <Link to={'/register'}> <button className='cursor-pointer hover:text-[#ff772e]' > Register</button></Link>
            </div>
            <img src={search} alt="searchbar" width={30} className='cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

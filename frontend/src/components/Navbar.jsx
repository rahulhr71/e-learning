import Logo from "../assets/logo.png";
import search from "../assets/search.png";
import { Link } from "react-router-dom";
import { useNavbar } from "../context/navbarContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons for mobile

export default function Navbar() {
  const { active, setActive } = useNavbar();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Courses", link: "/courses" },
    { name: "Notes", link: "/notes" },
    { name: "Contact Us", link: "/contact" },
    { name: "About Us", link: "/about" },
  ];

  return (
    <header className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            width={130}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-Exo font-semibold text-sm">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={() => setActive(item.name)}
              className={`hover:text-[#ff772e] transition ${
                active === item.name ? "text-[#ff772e]" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

      
        <div className="hidden md:flex items-center space-x-5">
          <div className="flex gap-2 font-Exo font-semibold text-sm">
            <Link
              to="/login"
              className="cursor-pointer hover:text-[#ff772e]"
            >
              Login /
            </Link>
            <Link
              to="/register"
              className="cursor-pointer hover:text-[#ff772e]"
            >
              Register
            </Link>
          </div>
          <img
            src={search}
            alt="search"
            width={25}
            className="cursor-pointer"
          />
        </div>

       
        <button
          className="md:hidden flex items-center text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 p-4 font-Exo font-semibold text-sm">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false);
                }}
                className={`hover:text-[#ff772e] transition ${
                  active === item.name ? "text-[#ff772e]" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-[#ff772e]"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-[#ff772e]"
              >
                Register
              </Link>
            </div>
          </nav>  
        </div>
      )}
    </header>
  );
}

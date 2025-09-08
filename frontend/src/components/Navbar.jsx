import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useNavbar } from "../context/navbarContext";
import { useUser } from "../context/userContext"; // 👈 user context
import { useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const { active, setActive } = useNavbar();
  const { userC, setUserC } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Courses", link: "/courses" },
    { name: "Notes", link: "/notes" },
    { name: "Contact Us", link: "/contact" },
    { name: "About Us", link: "/about" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login user");
    setUserC(null);
    navigate("/login");
  };

  return (
    <header className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="logo" width={130} className="cursor-pointer" />
        </Link>

        {/* Desktop Nav */}
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

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-5 relative">
          {!userC ? (
            <div className="flex gap-2 font-Exo font-semibold text-sm">
              <Link to="/login" className="cursor-pointer hover:text-[#ff772e]">
                Login /
              </Link>
              <Link to="/register" className="cursor-pointer hover:text-[#ff772e]">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-[#ff772e]"
              >
                <User size={20} /> Welcome, {userC.username || userC.email}
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/enrolled-courses"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    Enrolled Courses
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
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

            {!userC ? (
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
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-gray-600">Welcome, {userC.username || userC.email}</span>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-[#ff772e]">
                  Dashboard
                </Link>
                <Link to="/enrolled-courses" onClick={() => setIsOpen(false)} className="hover:text-[#ff772e]">
                  Enrolled Courses
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-left hover:text-[#ff772e]"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

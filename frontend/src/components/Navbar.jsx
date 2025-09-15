import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useNavbar } from "../context/navbarContext";
import { useAuth } from "../context/userContext"; // 👈 user context
import { useState, useEffect, useRef } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { active, setActive } = useNavbar();
  const { userC, setUserC } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Courses", link: "/courses" },
    { name: "Notes", link: "/notes" },
    { name: "Contact Us", link: "/contact" },
    { name: "About Us", link: "/about" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserC(null);
    setDropdown(false);
    navigate("/login");
    window.location.reload();
  };

  // Get display name for user
  const getUserDisplayName = () => {
    if (!userC) return "";
    return userC.username || userC.name || userC.email || "User";
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
              className={`hover:text-[#ff772e] transition-colors duration-200 ${
                active === item.name ? "text-[#ff772e]" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-5 relative">
          {!userC ? (
            // Non-logged-in user interface
            <div className="flex gap-2 font-Exo font-semibold text-sm">
              <Link 
                to="/login" 
                className="cursor-pointer hover:text-[#ff772e] transition-colors duration-200"
              >
                Login
              </Link>
              <span className="text-gray-400">/</span>
              <Link 
                to="/register" 
                className="cursor-pointer hover:text-[#ff772e] transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          ) : (
            // Logged-in user interface
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-[#ff772e] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <User size={20} />
                <span className="max-w-[120px] truncate">
                  {getUserDisplayName()}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    dropdown ? "rotate-180" : ""
                  }`} 
                />
              </button>

              {/* Desktop Dropdown */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userC.email}
                    </p>
                  </div>
                  
                  
                  
                  <Link
                    to="/enrolled-courses"
                    className="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    onClick={() => setDropdown(false)}
                  >
                    📚 Enrolled Courses
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-sm"
                    onClick={() => setDropdown(false)}
                  >
                    👤 Profile
                  </Link>
                  
                  <hr className="border-gray-200" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-sm"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-gray-700 hover:text-[#ff772e] transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <nav className="flex flex-col p-4 font-Exo font-semibold text-sm">
            {/* Navigation Links */}
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false);
                }}
                className={`py-3 hover:text-[#ff772e] transition-colors duration-200 border-b border-gray-100 ${
                  active === item.name ? "text-[#ff772e]" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile User Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {!userC ? (
                // Non-logged-in user mobile interface
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-4 bg-[#ff772e] text-white text-center rounded-lg hover:bg-[#e6661a] transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-4 border border-[#ff772e] text-[#ff772e] text-center rounded-lg hover:bg-[#ff772e] hover:text-white transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                // Logged-in user mobile interface
                <div className="flex flex-col">
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 truncate">
                      Welcome, {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userC.email}
                    </p>
                  </div>
                  
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)} 
                    className="py-3 hover:text-[#ff772e] transition-colors duration-200 border-b border-gray-100"
                  >
                    📊 Dashboard
                  </Link>
                  
                  <Link 
                    to="/enrolled-courses" 
                    onClick={() => setIsOpen(false)} 
                    className="py-3 hover:text-[#ff772e] transition-colors duration-200 border-b border-gray-100"
                  >
                    📚 Enrolled Courses
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    onClick={() => setIsOpen(false)} 
                    className="py-3 hover:text-[#ff772e] transition-colors duration-200 border-b border-gray-100"
                  >
                    👤 Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="mt-2 py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 text-left"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
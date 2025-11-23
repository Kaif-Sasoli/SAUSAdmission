import React, { useState, useRef, useEffect } from "react";
import SAUS_Background from "../assets/SAUS_lOGO.png";
import { Bell, ChevronDown, SquarePen, LogOut, Menu } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { useAuth } from "../contexts/AuthContext";

function Navbar({ mobileOpen, setMobileOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  // CLICK OUTSIDE HANDLER
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-2 fixed lg:px-5 py-1 flex justify-between items-center
     border-b border-gray-300 w-full bg-white z-10">

      {/* Logo */}
      <div className="w-16 h-16 hidden lg:block">
        <img className="h-full w-full" src={SAUS_Background} alt="Logo" />
      </div>

      {/* Mobile Menu */}
      <div className="block lg:hidden px-3">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu size={26} />
        </button>
      </div>

      {/* Profile Section — wrapped in ref */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>

        {/* Notifications */}
        <div className="relative p-1.5 bg-orange-50 text-orange-300
        cursor-pointer rounded-md">
          <span className="absolute -top-1 right-1 text-red-500">•</span>
          <Bell />
        </div>

        {/* User area */}
        <div className="flex gap-2 items-center cursor-pointer" onClick={toggleDropdown}>
          <Avatar src="" alt="Alice" size="md" status="online" />
          <div>
            <h1 className="sm text-gray-700">Alice</h1>
            <h1 className="text-xs text-gray-700">Student</h1>
          </div>

          <div className="px-1 pl-2 lg:pl-5 transition-transform duration-300">
            <ChevronDown
              size={15}
              className={`${dropdownOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
            />
          </div>
        </div>

        {/* Dropdown */}
        <div
          className={`
            absolute right-0 top-5 mt-12 w-full bg-white shadow-lg
            rounded-md border border-gray-200 z-50
            transition-all duration-300 origin-top
            ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          <ul>
            <li className="flex items-center gap-1 w-full px-4 py-2 text-sm
             hover:bg-gray-100 text-gray-700 border-b border-gray-300">
              <SquarePen size={18} className="text-orange-300" />
              Change Password
            </li>

            <li
              className="flex gap-1 items-center w-full px-4 py-2 text-sm
               hover:bg-gray-100 text-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={18} className="text-red-700" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

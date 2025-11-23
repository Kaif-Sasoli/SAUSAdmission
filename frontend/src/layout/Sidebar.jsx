import React, { useState, useRef, useEffect } from "react";

import {
  Home,
  Building2,
  CircleDollarSign,
  FileText,
  Info,
  Menu,
  Milestone,
  ChevronDown,
  Users,
  Calendar,
  CheckSquare,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user } = useAuth();
  const admissionRef = useRef(null);
  const [admissionOpen, setAdmissionOpen] = useState(false);

  const role = user?.role || "student";

  // MENU ITEMS
  const adminItems = [
    { to: "/dashboard", icon: <Home size={20} />, text: "Dashboard" },
    { to: "/profile/admin", icon: <Building2 size={20} />, text: "My Startup" },
    {
      to: "/students",
      icon: <CircleDollarSign size={20} />,
      text: "Find Students",
    },
  ];

  // Student
  const studentMainItem = {
    icon: <LayoutDashboard size={20} />,
    text: "DASHBOARD",

    icon: <Milestone size={20} />,
    text: "ADMISSION",
  };

  const studentDashboardItem = {
    to: "/dashboard/student",
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
  };

  const admissionSubItems = [
    {
      to: "/admission/instructions",
      icon: <Info size={18} />,
      text: "Instructions",
    },
    {
      to: "/admission/application",
      icon: <FileText size={18} />,
      text: "Submit Application",
    },
    {
      to: "/admission/candidate-status",
      icon: <Users size={18} />,
      text: "Candidate Status",
    },
    {
      to: "/admission/schedule",
      icon: <Calendar size={18} />,
      text: "Admission Schedule",
    },
    {
      to: "/admission/checklist",
      icon: <CheckSquare size={18} />,
      text: "Checklist",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        admissionRef.current &&
        !admissionRef.current.contains(event.target)
      ) {
        setAdmissionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-12 lg:top-18 left-0 h-[calc(100vh-3rem)] bg-primary2 text-white shadow-xl
          w-24 transition-all duration-300 z-40
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Content */}
        <div className="pt-10 px-3 space-y-3">
          {/* ADMIN ITEMS */}
          {role === "admin" &&
            adminItems.map((item, index) => (
              <NavLink
                to={item.to}
                key={index}
                className={({ isActive }) =>
                  `
                    flex items-center gap-4 p-3 rounded-md transition-all 
                    ${isActive ? "bg-primary3" : "hover:bg-primary3"}
                  `
                }
              >
                {item.icon}
                <span className="text-sm">{item.text}</span>
              </NavLink>
            ))}

          {/* STUDENT ADMISSION MENU WITH SUBMENU */}
          {role === "student" && (
            <>
              {/* Dashboard Direct Link */}
              <NavLink
                to={studentDashboardItem.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 p-3 rounded-md transition-all 
                     ${isActive ? "bg-primary3" : "hover:bg-primary3"}`
                }
              >
                {studentDashboardItem.icon}
                <span className="text-xs">{studentDashboardItem.text}</span>
              </NavLink>
              {/* Admission Button */}
              <div ref={admissionRef}>
                {/* Admission Button */}
                <div
                  onClick={() => setAdmissionOpen(!admissionOpen)}
                  className={`
                    flex flex-col gap-2 items-center justify-between px-3 rounded-md cursor-pointer
                    hover:bg-primary3 transition-all
                    ${admissionOpen ? "bg-indigo-800/50" : "hover:bg-primary"}`}
                              >
                                <span>{studentMainItem.icon}</span>
                                <span className="text-sm">{studentMainItem.text}</span>
                                <span>
                                  <ChevronDown size={20} />
                                </span>
                              </div>

                              {/* Dropdown Submenu */}
                              <div
                                className={`
                    absolute top-2 left-10 overflow-hidden text-black
                    transition-all duration-300 rounded-md 
                    ${admissionOpen ? "w-80 translate-x-16 bg-blue-50" : "max-w-0"}
                  `}
                >
                  {admissionSubItems.map((item, index) => (
                    <NavLink
                      to={item.to}
                      key={index}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-2 rounded-md text-sm 
          ${isActive ? "bg-primary3 text-white" : "hover:bg-indigo-100"}`
                      }
                    >
                      {item.icon}
                      {item.text}
                    </NavLink>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import bgImage from "../assets/SAUS_Background.jpg";
import wavySection from "../assets/wave-haikei.png";
import { delay, motion } from "framer-motion";

export const AuthLayout = () =>  {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname.includes("signup") ? "signup" : "login";

  return (
    <motion.div
      className="px-5 lg:px-0 flex justify-center items-center 
     relative h-screen w-full"
    >
      {/* Background Image */}
      <div
        className="absolute top-0 inset-0 bg-cover 
        bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

     <motion.div
        className="absolute top-5 right-5 bg-white/40 
        backdrop-blur-md rounded-full p-1 lg:flex shadow-m z-20 hidden"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }}
      >
        {/* Sign In Button */}
        <button
          onClick={() => navigate("/signin")}
          className={`relative z-10 px-5 py-2 text-sm font-semibold 
          rounded-full transition ${
            active === "login" ? "text-white" : "text-[#8b3156]"
          }`}
        >
          Sign In
        </button>

        {/* Sign Up Button */}
        <button
          onClick={() => navigate("/signup")}
          className={`relative z-10 px-5 py-2 text-sm font-semibold
          rounded-full transition ${
            active === "signup" ? "text-white" : "text-[#8b3156]"
          }`}
        >
          Sign Up
        </button>

        {/* Animated Highlight Background */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-0 bottom-0 w-1/2 bg-[#8b3156] rounded-full"
          style={{
            left: active === "login" ? "0%" : "50%",
          }}
        />
      </motion.div>

     
          {/* Render SignIn / SignUp Page */}
          <Outlet />

      <div className="absolute bottom-0">
        <img className="w-screen h-[40rem]" src={wavySection} alt="Section" />
      </div>
    </motion.div>
  );
}

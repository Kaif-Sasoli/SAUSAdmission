import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/SAUS_lOGO.png";
import { Lock, Smartphone, Mail } from "lucide-react";
import { delay, motion } from "framer-motion";
import { PulseLoader } from 'react-spinners';
import OTPModal from '../../components/auth/OTPModal';

function SignUp() {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showOTPModal, setShowOTPModal] = useState(false); 
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const simulatedUserId = "123456789";
    
    // Save the email + userId to send into OTP Modal
    setEmail(data.email);
    setUserId(simulatedUserId);

    // Show modal
    setShowOTPModal(true);
  };

  return (
    <>
    {/* OTP Modal */}
      <OTPModal  
      className="z-50"
        isOpen={showOTPModal} 
        onClose={() => setShowOTPModal(false)}  
        email={email} 
        userId={userId}

      />

      {!showOTPModal && (
     <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.9 }}
          className="px-5 pb-2 lg:pt-0 mt-5 lg:w-2/5 w-full flex flex-col
         justify-start bg-white/20 backdrop-blur-md z-10
         shadow-2xl rounded-2xl relative"
        >
          {/* Logo */}
          <motion.div 
          className="absolute top-[-56px] left-1/2 -translate-x-1/2"
           initial={{ y: -60, opacity: 0, scale: 0.8 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 180,
                duration: 0.9,
                delay: 0.2,
              },
            }}>
            <img className="w-28 h-28" src={Logo} alt="Logo" />
          </motion.div>

          {/* Title */}
          <div className="pt-12 text-center">
            <h1 className="text-3xl text-primary font-semibold">
              Create Your SAUS Account
            </h1>
            <p className="text-sm">Kindly Sign Up with your Credentials</p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 space-y-1 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
             {/* NIC */}
             <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
               <label className="block text-gray-700 font-medium mb-1">
                 NIC or B-Form <span className="text-red-500">*</span>
               </label>
               <div className="w-full flex items-center px-2 py-2 border
                border-primary rounded-md focus:bg-blue-50 outline-none">
                 <Smartphone size={20} />
                 <input
                   type="text"
                   {...register("nic", { required: "NIC or B-Form is required" })}
                   className="w-full px-2 outline-none"
                   placeholder="Enter NIC or B-Form"
                 />
               </div>
               {errors.nic &&
                <p className="text-red-500 text-sm mt-1">{errors.nic.message}</p>}
             </motion.div>

              {/* Email */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="block text-gray-700 font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex items-center px-2 py-2 border
                 border-primary rounded-md focus:bg-blue-50 outline-none">
                  <Mail size={20} />
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-2 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email &&
                 <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </motion.div>

              {/* Name  */}
                <div
                className="flex  justify-between">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full flex items-center px-2 py-2 border
                   border-primary rounded-md focus:bg-blue-50 outline-none">
                    <input
                      type="text"
                      {...register("firstName", { required: "First Name is required" })}
                      className="w-full px-2 outline-none"
                      placeholder="Enter First Name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

              {/* Last Name */}
              <div >
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex items-center px-2 py-2 border
                 border-primary rounded-md focus:bg-blue-50 outline-none">
                  <input
                    type="text"
                    {...register("lastName", { required: "Last Name is required" })}
                    className="w-full px-2 outline-none"
                    placeholder="Enter Last Name"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
              </div>
              
               {/* Password */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <label className="block text-gray-700 font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="w-full flex items-center px-2 py-2 border
                 border-primary rounded-md focus:bg-blue-50 outline-none">
                  <Lock size={20} />
                  <input
                    type="password"
                    {...register("passwordSignUp", { required: "Password is required" })}
                    className="w-full px-2 outline-none"
                    placeholder="Enter Password"
                  />
                </div>
                {errors.passwordSignUp && (
                  <p className="text-red-500 text-sm mt-1">{errors.passwordSignUp.message}</p>
                )}
              </motion.div>
              <div className="text-right text-sm">
              <button 
              onClick={() => navigate('/signin')}
              className="text-primary font-bold">
                Sign In
                </button>
            </div>

            {/* Submit Button */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="w-full flex justify-center pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-600 text-white py-2 px-18
                  focus:ring-0 disabled:cursor-not-allowed outline-0
                 rounded-md hover:bg-blue-500 transition`}
              >
                { isLoading ? <PulseLoader size={8} color="#fff"/> : "Sign Up" }
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
       )}
    </>
  )
}

export default SignUp
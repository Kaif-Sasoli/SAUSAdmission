import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/SAUS_lOGO.png";
import { Lock, Smartphone, Mail } from "lucide-react";
import { delay, motion } from "framer-motion";
import { PulseLoader } from 'react-spinners';

function SignIn() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
        //  Sign In
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.9 }}
          className="px-5 pt-7 py-10 lg:py-0 lg:w-1/3 lg:h-4/5 flex flex-col 
      justify-center bg-white/20 backdrop-blur-md
       z-10 shadow-2xl rounded-2xl relative"
        >
          {/* Logo  */}
          <motion.div
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
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img className="w-28 h-28" src={Logo} alt="Logo" />
          </motion.div>

          {/* Title */}
          <div className="py-3 text-center">
            <h1 className="text-3xl text-primary ">
              Welcome to SAUS Admission System
            </h1>
            <p className="text-sm">Kindly Sign In with your Credentials</p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* NIC or B-Form */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: 0.3,
                  },
                },
              }}
            >
              <label className="block text-gray-700 font-medium mb-1">
                NIC or B-Form<span className="text-red-500">*</span>
              </label>
              <div
                className="w-full flex items-center px-1 py-2 border border-primary rounded-md 
              focus:bg-blue-50 outline-none"
              >
                <Smartphone size={20} />
                <input
                  type="text"
                  {...register("nic", {
                    required: "NIC or B-Form is required",
                  })}
                  className="w-full px-2 outline-none"
                  placeholder="Enter NIC or B-Form"
                />
              </div>
              {errors.nic && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nic.message}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: 0.5,
                  },
                },
              }}
            >
              <label className="block text-gray-700 font-medium mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <div
                className="w-full flex items-center px-1 py-2 border border-primary rounded-md 
              focus:bg-blue-50 outline-none"
              >
                <Lock size={20} />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-1 outline-none"
                  placeholder="Enter Password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>
            <div className="text-right text-sm">
              <button
              onClick={() => navigate('/signup')}
              className="text-primary font-bold">
                Sign Up
                </button>
              <span className="pl-1 pr-1">|</span>
              <button>Forgot Password</button>
            </div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="w-full flex justify-center pt-2"
            >
              {/* Submit Button */}
              <button
                type="submit"
                className={`bg-blue-600 text-white py-2 px-18
                  focus:ring-0 disabled:cursor-not-allowed outline-0
                 rounded-md hover:bg-blue-500 transition`}
              >
                { isLoading ? <PulseLoader size={8} color="#fff"/> : "Sign In" }
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
  
  );
}

export default SignIn;

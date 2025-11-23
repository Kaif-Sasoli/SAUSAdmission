import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { verifyEmail } from '../../api/auth';
// import { useAuth } from "../../context/AuthContext";

Modal.setAppElement("#root");

const OTP = ({ isOpen, onClose, userId, email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(Array(5).fill("")); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  // const { verifyAndLogin } = useAuth();

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
      setResendTimer(60);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleInputChange = (value, index) => {
    setError("");
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, otp.length);

    if (!/^\d+$/.test(pastedData)) {
      setError("Please paste numbers only");
      return;
    }

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (index < otp.length) newOtp[index] = value;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length - 1, otp.length - 1);
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    // if (otp.some(digit => !digit)) {
    //   setError("Please enter all digits");
    //   return;
    // }

    // try {
    //   const res = await verifyEmail({
    //     id: userId,
    //     email,
    //     verificationCode: otp.join("")
    //   });

    //   verifyAndLogin(res);

    //   if (onVerificationSuccess) {
    //     onVerificationSuccess();
    //   }

    //   navigate(res.user?.role === "entrepreneur" ? "/dashboard/entrepreneur" : "/dashboard/investor");

    //   setOtp(Array(5).fill(""));
    //   setError("");
    //   setResendTimer(60);

    //   onClose();
    //   return res;

    // } catch (err) {
    //   setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    //   throw err;
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/user/send-mail`, { email });

      setOtp(Array(5).fill(""));
      inputRefs.current[0]?.focus();
      setError("New OTP sent successfully!");
      setResendTimer(60);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setOtp(Array(5).fill(""));
      setError("");
      setResendTimer(60);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl 
      transform transition-all outline-none fixed top-1/2
      left-1/2 -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-opacity-50 
      backdrop-blur-xs z-[9998] flex items-center justify-center p-4 "
    >
      <div className="relative p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors text-xl"
        >
          ×
        </button>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-primary2">Verify Your Email</h2>
          <p className="text-gray-500 text-sm md:text-base">
            We've sent a 5-digit code to your email.
            <br />
            Please enter it below to continue.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isLoading}
              className="w-12 h-12 text-center text-lg text-primary2 font-semibold border-2 rounded-lg
                focus:border-primary3 focus:ring-2 focus:ring-[#eaa3c1] outline-none transition-all
                disabled:bg-gray-50 disabled:text-gray-400"
            />
          ))}
          </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          onClick={handleVerifyOTP}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-primary2 text-white rounded-lg font-medium mb-4
            hover:bg-primary focus:ring-4 focus:ring-primary3 transition-all
            disabled:bg-primary3 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center text-gray-500 text-sm">
          Didn't receive the code?{" "}
          <button
            className="text-primary2 hover:underline font-medium
             disabled:text-primary2 disabled:cursor-not-allowed"
            onClick={handleResendOTP}
            disabled={isLoading || resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OTP;

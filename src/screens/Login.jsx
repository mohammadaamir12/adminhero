import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img.png";

const Login = ({ setAuth }) => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user data
    const userData = localStorage.getItem("responseData");
    if (userData) {
      setAuth(true);
      navigate("/");
    }
  }, []);

  const handleNumberSubmit = async (e) => {
    e.preventDefault();
    if (number) {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          "https://4wex2d2cz0.execute-api.ap-south-1.amazonaws.com/default/lambda-staff-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: `+91${number}`,
              refresh_token: "False",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send OTP. Please try again.");
        }

        const data = await response.json();
        localStorage.setItem("responseData", JSON.stringify(data));
        console.log(data);
        setShowOtp(true);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setError("Please enter a valid phone number.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      const storedData = localStorage.getItem("responseData");
      const parsedData = JSON.parse(storedData);
      const sessionId = parsedData.session;
      const challenge = parsedData.challengeParameters.USERNAME;
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          "https://218j49ra6l.execute-api.ap-south-1.amazonaws.com/default/lambda-staff-login-validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_number: `+91${number}`,
              session: sessionId,
              challengeParameters: {
                USERNAME: challenge,
                answer: otp,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("OTP verification failed. Please try again.");
        }

        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        console.log("OTP verified successfully:", data);
        navigate("/");
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setError("Please enter a valid OTP.");
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={showOtp ? handleOtpSubmit : handleNumberSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-center">
          <img
            src={img} // Replace with your image URL
            alt="Your Alt Text"
            className="w-32 h-auto" // Adjust width as needed
          />
        </div>

        {/* <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2> */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={number}
          onChange={handleNumberChange}
          placeholder="Enter your number"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-transform transform focus:scale-105"
        />
        {showOtp && (
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-transform transform focus:scale-105"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 relative"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0H4z"
                />
              </svg>
              Loading...
            </span>
          ) : showOtp ? (
            "Verify OTP"
          ) : (
            "Send OTP"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;


import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function Login() {


  const [isLogin, setLogin] = useState(true);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          fullName,
          email,
          password,
        },

      );

      console.log(response.data);
      setfullName("");
      setemail("");
      setpassword("");

        toast.success("Account created successfully!");


    }
    catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      {/* ================= LEFT SECTION ================= */}
      <div className="w-full lg:w-1/2 min-h-[35vh] lg:min-h-screen bg-blue-950 flex items-center justify-center px-8 py-12 lg:px-16">

        <div className="max-w-md text-center lg:text-left">

          {/* Logo / Brand */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-300">
              ShopeMate
            </h2>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Better Products
            <br />
            <span className="text-blue-400">
              For a Brighter You
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed">
            Discover amazing products, shop with confidence,
            and enjoy a better shopping experience with ShopeMate.
          </p>

          {/* Decorative Box */}
          <div className="mt-10 hidden sm:flex gap-4">
            <div className="h-2 w-16 rounded-full bg-blue-400"></div>

            <div className="h-2 w-8 rounded-full bg-blue-600"></div>

            <div className="h-2 w-3 rounded-full bg-blue-800"></div>
          </div>

        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="w-full lg:w-1/2 min-h-[65vh] lg:min-h-screen bg-white flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Welcome "}
            </h1>

            <p className="mt-2 text-gray-500">
              {isLogin ? "Please login to your account" : "Please create your account"}
            </p>
          </div>

          {/* Login / Register Buttons */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">


            <button onClick={() => setLogin(true)}
              className={`w-1/2 py-3 rounded-lg font-semibold shadow-sm${isLogin ? " bg-blue-950 text-white" : " text-gray-500 bg-white"}`}
            >
              Login
            </button>

            <button onClick={() => setLogin(false)}
              className={`w-1/2 py-3 rounded-lg font-semibold shadow-sm${isLogin ? "text-gray-500 bg-white" : " bg-blue-950 text-white"}`}
            >
              Register
            </button>

          </div>

          {!isLogin && (
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-100 transition placeholder:text-gray-400"
              />

            </div>
          )}

          {/* Email */}
          <div className="mb-5">

            <label
              className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-100 transition placeholder:text-gray-400"
            />

          </div>

          {/* Password */}
          <div className="mb-4">

            <div className="flex justify-between items-center mb-2">

              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>



            </div>

            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-100 transition placeholder:text-gray-400"
            />

          </div>

          {/* Login Button */}
          <button
            onClick={submitHandler}
            className="w-full mt-5 py-3.5 rounded-xl bg-blue-950 text-white font-semibold text-lg hover:bg-blue-900 active:scale-[0.99] transition duration-200 shadow-lg shadow-blue-950/20"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          {/* Register Text */}
          {isLogin &&
            <p className="text-center text-sm text-gray-500 mt-7">

              Don't have an account?{" "}

              <button onClick={() => setLogin(false)}
                className="text-blue-950 font-semibold hover:underline">
                Create Account
              </button>

            </p>
          }
        </div>
      </div>

    </div>
  );
}


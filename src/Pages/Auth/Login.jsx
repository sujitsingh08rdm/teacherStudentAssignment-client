import React, { useState } from "react";
import { FaLock, FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import toast from "react-hot-toast";

export default function Login() {
  const initialFormData = {
    username: "",
    password: "",
  };
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);

  function handleOnChange(e) {
    const cpyFormData = { ...formData };
    cpyFormData[e.target.name] = e.target.value;
    setFormData(cpyFormData);
  }

  function validateForm() {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 3) {
      toast.error("Password must be at least 3 characters");
      return false;
    }
    return true;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.error("Password/Username not correct");
      }
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          tailwebs.
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="flex items-center border rounded px-3">
              <span className="text-gray-500">
                <FaRegUser />
              </span>
              <span className="h-5 border-l mx-2 border-gray-700"></span>
              <input
                name="username"
                value={formData.email}
                onChange={handleOnChange}
                type="text"
                placeholder="Enter username..."
                className="w-full px-2 py-2 text-sm outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded px-3">
              <span className="text-gray-500">
                <FaLock />
              </span>
              <span className="h-5 border-l mx-2 border-gray-700"></span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="********"
                className="w-full px-2 py-2 text-sm outline-none"
              />
              <span className="text-gray-500 cursor-pointer">
                <i className="fas fa-eye" />
              </span>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Button */}
          <button className="w-[50%] mx-auto py-2 mt-4 bg-black text-white rounded hover:bg-gray-800">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

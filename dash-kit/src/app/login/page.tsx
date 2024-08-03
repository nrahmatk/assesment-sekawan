"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const validate = () => {
    let errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      router.push("/overview");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-p-gray p-4">
      <div className="bg-white px-8 py-10 rounded-lg w-full max-w-sm">
        <div className="flex justify-center mb-3">
          <div className="bg-p-blue h-12 w-12 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">D</span>
          </div>
        </div>
        <h2 className="text-lg font-medium text-center text-gray-400">
          Dashboard Kit
        </h2>
        <p className="text-2xl font-medium text-center text-p-black mt-7 mb-3">
          Log In to Dashboard Kit
        </p>
        <p className="text-sm text-center text-gray-400">
          Enter your email and password below
        </p>
        <form className="mt-14" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="Email address"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-p-blue ${
                errors.email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-400">
                PASSWORD
              </label>
              <a href="#" className="text-xs text-gray-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="h-14 absolute inset-y-0 right-3 flex items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: "#7D848D" }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-p-blue text-white py-4 text-sm rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

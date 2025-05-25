"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import axios from "axios";

import "../../css/fireworks.css";

export default function SignupPassword() {
  const [data, setData] = useState({
    email: "",
    password: "",
    FullName: "",
    remember: false,
  });
  const [showFireworks, setShowFireworks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://api.scanvirus.me/Auth/register', {
        email: data.email,
        password: data.password,
        FullName: data.FullName,
      });
      setShowPopup(true);
      setShowFireworks(true)
      setTimeout(() => {  
        setShowFireworks(false);
      }, 10000);
      setErrorMessage("");
    } catch (error: any) {
      if (error.response && Array.isArray(error.response.data)) {
        const messages = error.response.data.map((err: any) => err.description).join(" ");
        setErrorMessage(messages);
      } else if (error.response && error.response.data === "Email is already taken.") {
        console.log(error);
        setErrorMessage("Email is already taken.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {showFireworks && (
            <div className="pyro z-20">
              <div className="before"></div>
              <div className="after"></div>
            </div>
          )}
    <form onSubmit={handleSubmit}>
      
      {showPopup && (
          <div className="fixed inset-0 z-[999] flex justify-center items-center bg-gray-500 bg-opacity-50">
            {showFireworks && (
              <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
              </div>
            )}
            <div className="relative bg-white z-[999] p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 md:w-1/4 lg:w-1/5 dark:bg-gray-dark dark:shadow-card">
            {showFireworks && (
              <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
              </div>
            )}
              {/* Button X để đóng popup */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl"
                aria-label="Close"
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold text-center p-3">
                Please Check Your Email!
              </h2>
            </div>
          </div>
      )}

      <InputGroup
        type="FullName"
        label="Name"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your name"
        name="FullName"
        handleChange={handleChange}
        value={data.FullName}
      />

      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        showPasswordToggle={true}
      />

      {errorMessage && (

        <p className="pl-1 text-sm text-red">{errorMessage}</p>

      )}

      <div className="mt-1 mb-6 flex items-center justify-end gap-2 py-2 font-medium">
        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign Up
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
    </>
  );
}

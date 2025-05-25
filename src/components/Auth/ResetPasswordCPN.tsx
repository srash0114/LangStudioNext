"use client";
import React, { useState, useEffect } from "react";
import InputGroup from "../FormElements/InputGroup";
import axios from 'axios';
import "../../css/fireworks.css";

export default function ResetWithToken() {
  const [data, setData] = useState({
    newPassword: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [loading, setLoading] = useState(false);

  // Lấy email và token từ URL
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      email: urlParams.get("email"),
      token: urlParams.get("token"),
    };
  };

  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { email, token } = getUrlParams();
    setEmail(email);
    setToken(token);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !token) {
      setErrorMessage("Invalid request. Email or token is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://api.scanvirus.me/Auth/reset-password', {
        email: email,
        token: token,
        newPassword: data.newPassword,
      }, {
        withCredentials: true,
      });
      setShowPopup(true);
    } catch (error: any) {
      if (error.response && error.response.data === "Invalid token.") {
        setErrorMessage("Invalid token.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {showPopup && (
        <div className="fixed inset-0 z-[999] flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="relative bg-white z-[999] p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 md:w-1/4 lg:w-1/5 dark:bg-gray-dark dark:shadow-card">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center p-3">
              Congratulations!
            </h2>
          </div>
        </div>
      )}

      <InputGroup
        type="password"
        label="New Password"
        className="[&_input]:py-[15px] mb-4.5"
        placeholder="Enter your new password"
        name="newPassword"
        handleChange={handleChange}
        value={data.newPassword}
        showPasswordToggle={true}
      />
      {errorMessage && (
        <p className="pl-1 text-sm text-red">{errorMessage}</p>
      )}

      <div className="py-2.5"></div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Update password
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}

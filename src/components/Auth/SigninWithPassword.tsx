"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import axios from "axios";
import { useRouter } from "next/navigation";
import ErrorMs from '@/components/ErrorNetWork/ErrorNetWork';

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

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
      const response = await axios.post('https://api.scanvirus.me/Auth/login', {
        email: data.email,
        password: data.password,
      }, {
        withCredentials: true 
      });
      
      const userRes = await axios.get('https://api.scanvirus.me/User/info', {
        withCredentials: true  
      });
      window.dispatchEvent(new Event('update-header'));
      
      router.push("/");

      setLoading(false);
    } catch (error: any) {
      if(error.response && error.response.data === "Invalid credentials"){
        setErrorMessage("Incorrect username or password.")
        setPopup(false)
      }
      else{
        // setErrorMessage("An error occurred. Please try again later.")
        setErrorMessage("");
        setPopup(true)
        const timer = setTimeout(() => {
          setPopup(false)
        }, 6000);
      }
      setLoading(false);
    }
  };


  return (
    <form method="POST" onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        autocomplete="username"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5"
        placeholder="Enter your password"
        name="password"
        autocomplete="current-password"
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
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
        
      </div>
      {popup && (
        <ErrorMs color='warning' message='Something went wrong. Please check your internet connection or try accessing the site using Google Chrome.' timeout={6000}></ErrorMs>
      )}
      
    </form>
  );
}

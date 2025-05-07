"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import axios from 'axios';

import "../../css/fireworks.css";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const options = {
    method: 'POST',
    url: 'http://42.96.13.119/Auth/login',
    headers: {authorization: 'Bearer {{token}}', 'content-type': 'application/json'},
    data: {email: data.email}
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
          
    setLoading(true);
   
    try {
      const { data } = await axios.request(options);
      console.log(data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);

    }

  };

  return (
    
    <form onSubmit={handleSubmit}>

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


      <div className="py-2.5">
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Resend Password
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}

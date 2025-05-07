"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import axios from "axios";

import "../../css/fireworks.css";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  // Tải dữ liệu lưu từ localStorage nếu có
  useEffect(() => {
    const storedEmail = localStorage.getItem("remember_email");
    const storedPass = localStorage.getItem("remember_password");
    const remember = localStorage.getItem("remember_me") === "true";

    if (remember && storedEmail && storedPass) {
      setData({
        email: storedEmail,
        password: storedPass,
        remember: true,
      });
    }
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

    const options = {
      method: "POST",
      url: "http://42.96.13.119/Auth/login",
      headers: {
        authorization: "Bearer {{token}}",
        "content-type": "application/json",
      },
      data: {
        email: data.email,
        password: data.password,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Login Success:", response.data);

      // Lưu thông tin nếu "Remember me" được bật
      if (data.remember) {
        localStorage.setItem("remember_email", data.email);
        localStorage.setItem("remember_password", data.password);
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remember_email");
        localStorage.removeItem("remember_password");
        localStorage.removeItem("remember_me");
      }

      setLoading(false);
      // redirect hoặc xử lý tiếp theo ở đây...
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <InputGroup
        type="name"
        label="Name"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your name"
        name="name"
        handleChange={handleChange}
        value={data.password}
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
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
      />

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          checked={data.remember}
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

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
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">Log in</h2>
      </div>

      <div className="mx-4 py-12 bg-white border rounded-lg flex flex-col justify-center items-center">
        <input
          type="email"
          name=""
          value={email}
          className="bg-slate-100 rounded-lg px-6 py-2 mb-6"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name=""
          value={password}
          className="bg-slate-100 rounded-lg px-6 py-2 mb-6"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="primary_btn mb-6">
          Login
        </button>

        <p>
          Don&apos;t Have Account? &nbsp;
          <Link href="/signup" className="txt_gradient">
            Sign up Here
          </Link>
        </p>
      </div>

      <div className="auth_bottom_info">
        <p>
          This is a personal project for practicing my web development ability &
          skills
        </p>
        <p>nadim-chowdhury@outlook.com</p>
        <p>+880 1971 258803</p>
      </div>
    </>
  );
}

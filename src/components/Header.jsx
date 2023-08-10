"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-white flex justify-between items-center py-5 shadow px-4 sticky top-0 mb-14">
      <div className="text-slate-800">
        <Link href="/" className="text-2xl font-bold uppercase txt_gradient">
          FootHub
        </Link>
      </div>

      <div
        className={`${
          openMenu
            ? "absolute flex flex-col h-screen bg-white border-l top-0 right-0 px-8 pt-16 text-end"
            : "hidden"
        } sm:block`}
      >
        <button
          className="sm:hidden ml-auto text-2xl hover:text-rose-500 mb-4"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <AiFillCloseCircle />
        </button>

        <Link href="/teams" className="mt-4 sm:mr-4 txt_hover">
          Teams
        </Link>
        <Link href="/leagues" className="mt-4 sm:mr-4 txt_hover">
          Leagues
        </Link>
        <Link href="/countries" className="mt-4 txt_hover">
          Countries
        </Link>

        <Link href="/login" className="primary_btn mt-4 sm:hidden">
          Log In
        </Link>
      </div>

      <div
        className="block sm:hidden text-2xl txt_hover hover:text-rose-500 cursor-pointer"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <FiMenu />
      </div>

      <div className="hidden sm:block">
        <Link href="/login" className="primary_btn">
          Log In
        </Link>
      </div>
    </header>
  );
}

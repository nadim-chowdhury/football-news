import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-white flex justify-between items-center py-5 shadow px-4 sticky top-0 mb-14">
      <div className="text-slate-800">
        <Link href="/" className="text-2xl font-bold uppercase txt_gradient">
          FootHub
        </Link>
      </div>

      <div className="text-slate-800 hidden sm:block">
        <Link href="/teams" className="mr-4 txt_hover">
          Teams
        </Link>
        <Link href="/leagues" className="mr-4 txt_hover">
          Leagues
        </Link>
        <Link href="/countries" className="txt_hover">
          Countries
        </Link>
      </div>

      <div className="block sm:hidden text-2xl txt_hover hover:text-rose-500">
        <FiMenu />
      </div>
    </header>
  );
}

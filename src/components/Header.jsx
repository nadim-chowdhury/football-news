import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-6 shadow px-4 sticky top-0">
      <div className="text-slate-800">
        <Link href="/" className="text-3xl font-bold txt_gradient">
          FootHub
        </Link>
      </div>

      <div className="text-slate-800 hidden sm:block">
        <Link href="/teams" className="mr-4 header_hover">
          Teams
        </Link>
        <Link href="/leagues" className="mr-4 header_hover">
          Leagues
        </Link>
        <Link href="/countries" className="header_hover">
          Countries
        </Link>
      </div>

      <div className="block sm:hidden text-xl">
        <GiHamburgerMenu />
      </div>
    </header>
  );
}

import { teams } from "@/utils/teams";
import Link from "next/link";
import { AiOutlineGlobal, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 text-center mb-8 px-4">
        {teams.map((team) => (
          <div key={team.league}>
            <h3 className="footer_txt font-bold">{team.league}</h3>

            <div>
              {team.topTeams.map((teamName) => (
                <p key={teamName.id} className="txt_hover">
                  {teamName.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 px-4 sm:flex sm:justify-between sm:items-center">
        <p className="text-center sm:text-start">
          &copy;2023 Design & Developed by &nbsp;
          <span className="txt_gradient">Nadim Chowdhury</span>
        </p>

        <div className="flex items-center justify-center mt-4 sm:mt-0">
          <Link
            href="https://nadim.vercel.app/"
            className="txt_hover hover:text-rose-500 mr-2"
          >
            <AiOutlineGlobal />
          </Link>
          <Link
            href="https://github.com/nadim-chowdhury"
            className="txt_hover hover:text-rose-500 mr-2"
          >
            <AiFillGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/nadim-chowdhury"
            className="txt_hover hover:text-rose-500"
          >
            <AiFillLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
}

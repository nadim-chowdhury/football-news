import Image from "next/image";
import Link from "next/link";

export default function MatchCard({ data }) {
  const { fixture, teams } = data;

  return (
    <Link
      href={`/match/${fixture.id}`}
      className="border rounded-lg bg-white p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-center pt-4">
        <div className="fixture_card_teams">
          <Image
            src={teams.home.logo}
            alt=""
            width={48}
            height={48}
            className="mx-auto h-12 object-contain"
          />
          <p className="mt-4 font-bold text-center h-[72px] txt_hover">
            {teams.home.name}
          </p>
        </div>

        <h4 className="border-2 rounded-full p-2 txt_gradient font-bold mx-2">
          VS
        </h4>

        <div className="fixture_card_teams">
          <Image
            src={teams.away.logo}
            alt=""
            width={48}
            height={48}
            className="mx-auto h-12 object-contain"
          />
          <p className="mt-4 font-bold text-center h-[72px] txt_hover">
            {teams.away.name}
          </p>
        </div>
      </div>

      <h4 className="mt-4 py-2 rounded-lg text-center border txt_gradient">
        UTC: {new Date(fixture.timestamp * 1000).toLocaleTimeString()}
      </h4>
    </Link>
  );
}

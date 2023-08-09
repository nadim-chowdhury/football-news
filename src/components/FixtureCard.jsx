import Image from "next/image";

export default function FixtureCard({ data }) {
  const { fixture, league, teams, goals, score } = data;
  return (
    <div className="border rounded-lg bg-white p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center w-[40%]">
          <Image
            src={teams.home.logo}
            alt=""
            width={48}
            height={48}
            className="mx-auto"
          />
          <p className="mt-4 font-bold text-center">{teams.home.name}</p>
        </div>

        <h4 className="border-2 rounded-full p-2 txt_gradient font-bold">VS</h4>

        <div className="flex flex-col justify-center w-[40%]">
          <Image
            src={teams.away.logo}
            alt=""
            width={48}
            height={48}
            className="mx-auto"
          />
          <p className="mt-4 font-bold text-center">{teams.away.name}</p>
        </div>
      </div>

      <h4 className="mt-4 py-2 rounded-lg text-center border">
        UTC: {new Date(fixture.timestamp * 1000).toLocaleTimeString()}
      </h4>
    </div>
  );
}
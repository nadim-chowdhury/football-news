import LeagueCard from "../../components/LeagueCard";

export default function Leagues() {
  return (
    <section>
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          Top Leagues
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-4 gap-6">
        <LeagueCard country={"England"} />
        <LeagueCard country={"Spain"} />
        <LeagueCard country={"Germany"} />
        <LeagueCard country={"Italy"} />
        <LeagueCard country={"France"} />
      </div>
    </section>
  );
}

import TeamCard from "../../components/TeamCard";

export default function Teams() {
  return (
    <section>
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          Top Teams
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mx-4 gap-6">
        <TeamCard teamId={529} league={140} />
        {/* <TeamCard teamId={541} league={140} />
        <TeamCard teamId={33} league={39} />
        <TeamCard teamId={50} league={39} />
        <TeamCard teamId={157} league={78} />
        <TeamCard teamId={496} league={135} />
        <TeamCard teamId={85} league={61} /> */}
      </div>
    </section>
  );
}

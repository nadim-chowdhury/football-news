import Fixtures from "../components/Fixtures";

export default function Home() {
  return (
    <section className="">
      <div className="px-4 my-10">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          Upcoming Matches
        </h2>
      </div>

      <Fixtures />
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import FixtureStatistics from "../../../components/FixtureStatistics";

export default function FixtureById() {
  const [fixture, setFixture] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const options = {
        method: "GET",
        url: `https://api-football-v1.p.rapidapi.com/v3/fixtures`,
        params: { id: id },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
        },
      };

      const fetchData = async () => {
        try {
          const response = await axios.request(options);
          setFixture(response.data.response[0]);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-xl font-bold txt_gradient">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-xl font-bold txt_gradient">
        Error loading fixture data.
      </p>
    );
  }

  return (
    <div className="mx-4">
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          {fixture?.league?.name}
        </h2>
      </div>

      <div className="sm:flex sm:items-center sm:justify-around">
        <div className="bg-white p-8 border rounded-lg text-center flex flex-col justify-between sm:w-[40%]">
          <Image
            src={fixture?.teams?.home?.logo}
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-4 h-16 object-contain"
          />
          <h3 className="text-xl font-bold mt-4 txt_hover cursor-pointer">
            {fixture?.teams?.home?.name ? fixture.teams.home.name : ""}
          </h3>
        </div>

        <h4 className="border-2 rounded-full p-4 txt_gradient font-bold my-8 mx-4 text-center">
          VS
        </h4>

        <div className="bg-white p-8 border rounded-lg text-center flex flex-col justify-between sm:w-[40%]">
          <Image
            src={fixture?.teams?.away?.logo}
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-4 h-16 object-contain"
          />
          <h3 className="text-xl font-bold mt-4 txt_hover cursor-pointer">
            {fixture?.teams?.away?.name ? fixture.teams.away.name : ""}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-center mt-14">
        <p className="py-4 px-8 font-bold bg-white border rounded-lg">
          {fixture?.goals?.home}
        </p>
        <p className="py-4 px-8 font-bold mx-4 border rounded-lg txt_gradient">
          Score
        </p>
        <p className="py-4 px-8 font-bold bg-white border rounded-lg">
          {fixture?.goals?.away}
        </p>
      </div>

      <div className="text-center my-14 py-12 bg-white border rounded-lg">
        <h4 className="mb-4 rounded-lg text-center font-bold txt_gradient">
          UTC:&nbsp;
          {new Date(fixture?.fixture?.timestamp * 1000).toLocaleTimeString()}
        </h4>
        <p className="mb-4">
          <span className="txt_gradient font-bold">Venue Name:</span>&nbsp;
          {fixture?.fixture?.venue?.name}
        </p>
        <p className="mb-4">
          <span className="txt_gradient font-bold">Venue City:</span>&nbsp;
          {fixture?.fixture?.venue?.city}
        </p>
        <p className="mb-4">
          <span className="txt_gradient font-bold">League Country:</span>&nbsp;
          {fixture?.league?.country}
        </p>
        <p className="mb-4">
          <span className="txt_gradient font-bold">League Season:</span>&nbsp;
          {fixture?.league?.season}
        </p>
        <p>
          <span className="txt_gradient font-bold">Round:</span>&nbsp;
          {fixture?.league?.round}
        </p>
      </div>

      <FixtureStatistics />

      {/* <div>
          {fixture?.players[0]?.players?.map((data) => (
            <div key={data.player.id}>
              <Image src={data.player.photo} alt="" width={48} height={48} />
              <h3>{data.player.name}</h3>
            </div>
          ))}
        </div> */}
    </div>
  );
}

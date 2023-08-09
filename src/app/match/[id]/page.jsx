"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function FixtureById() {
  const [fixture, setFixture] = useState({});
  console.log("🚀 ~ file: page.jsx:9 ~ FixtureById ~ fixture:", fixture);
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

      <div className="flex items-center justify-around">
        <div className="bg-white p-4 border rounded-lg text-center flex flex-col justify-between w-[40%]">
          <Image
            src={fixture?.teams?.home?.logo}
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-4 h-16 object-contain"
          />
          <h3 className="text-xl font-bold">
            {fixture?.teams?.home?.name ? fixture.teams.home.name : ""}
          </h3>
        </div>

        <h4 className="border-2 rounded-full p-4 txt_gradient font-bold my-8 mx-4">
          VS
        </h4>

        <div className="bg-white p-4 border rounded-lg text-center flex flex-col justify-between w-[40%]">
          <Image
            src={fixture?.teams?.away?.logo}
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-4 h-16 object-contain"
          />
          <h3 className="text-xl font-bold">
            {fixture?.teams?.away?.name ? fixture.teams.away.name : ""}
          </h3>
        </div>
      </div>

      <div className="text-center mt-14 py-8 bg-white border rounded-lg">
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
        <p>
          <span className="txt_gradient font-bold">League Season:</span>&nbsp;
          {fixture?.league?.season}
        </p>
      </div>

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

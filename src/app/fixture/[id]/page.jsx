"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function FixtureById() {
  const [fixture, setFixture] = useState({});
  console.log("🚀 ~ file: page.jsx:6 ~ FixtureById ~ fixture:", fixture);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: { id },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setFixture(response.data.response[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="mx-4">
      <div className="flex flex-col items-center">
        <div>
          <Image
            src={fixture?.teams?.home?.logo}
            alt=""
            width={96}
            height={96}
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-bold">
            {fixture?.teams?.home?.name ? fixture.teams.home.name : ""}
          </h3>
        </div>

        <h4 className="border-2 rounded-full p-2 txt_gradient font-bold my-8">
          VS
        </h4>

        <div>
          <Image
            src={fixture?.teams?.away?.logo}
            alt=""
            width={96}
            height={96}
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-bold">
            {fixture?.teams?.away?.name ? fixture.teams.away.name : ""}
          </h3>
        </div>
      </div>
    </div>
  );
}

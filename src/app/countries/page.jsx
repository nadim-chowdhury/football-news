"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  console.log("🚀 ~ file: page.jsx:5 ~ Countries ~ countries:", countries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/teams/countries",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setCountries(response.data.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-xl font-bold txt_gradient">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-xl font-bold txt_gradient">
        Error loading countries data.
      </p>
    );
  }

  return (
    <section>
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          National Teams
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mx-4">
        {countries.map((data, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center bg-white border p-4 rounded-lg"
          >
            <Image
              src={
                data?.flag
                  ? data?.flag
                  : "https://w7.pngwing.com/pngs/248/249/png-transparent-american-football-football-team-football-sport-sports-equipment-football-team.png"
              }
              alt=""
              width={64}
              height={64}
              className="h-16 object-cover rounded-full"
            />
            <h4 className="txt_gradient text-lg font-bold my-4">
              {data?.name ? data?.name : "Error 404"}
            </h4>
            <p>{data?.code ? data?.code : "Error 404"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

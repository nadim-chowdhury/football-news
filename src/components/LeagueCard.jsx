"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function LeagueCard({ country }) {
  const [leagueInfo, setLeagueInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeague = async (country) => {
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
        params: { country: country },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        return response.data.response.filter(
          (item) =>
            item.league.name === "Premier League" ||
            item.league.name === "La Liga" ||
            item.league.name === "Bundesliga" ||
            item.league.name === "Serie A" ||
            item.league.name === "Ligue 1"
        );
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const fetchData = async () => {
      try {
        const leagueData = await fetchLeague(country);
        setLeagueInfo(leagueData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

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
    <div className="bg-white border px-4 py-8 rounded-lg">
      {leagueInfo.map((item) => (
        <div key={item.league.id}>
          <div className="flex flex-col lg:flex-row justify-center items-center mb-8">
            <div className="flex flex-col items-center justify-between lg:mr-8">
              <Image
                src={item.country.flag}
                alt=""
                width={72}
                height={72}
                className="h-16 object-contain"
              />
              <h3 className="txt_gradient font-bold text-xl border px-6 py-1 rounded-lg text-center mt-4">
                {item.country.name}
              </h3>
            </div>

            <div className="flex flex-col items-center justify-between mt-6 lg:mt-0">
              <Image
                src={item.league.logo}
                alt=""
                width={72}
                height={72}
                className="h-16 object-contain"
              />
              <h3 className="txt_gradient font-bold text-xl border px-6 py-1 rounded-lg text-center mt-4">
                {item.league.name}
              </h3>
            </div>
          </div>

          <table className="my-2 w-full text-center text-sm lg:text-base">
            <thead>
              <tr>
                <th scope="col" className="py-3 bg-slate-100 rounded-l-lg">
                  Year
                </th>
                <th scope="col" className="py-3 bg-slate-100">
                  Start Date
                </th>
                <th scope="col" className="py-3 bg-slate-100 rounded-r-lg">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {item.seasons
                .sort((a, b) => b.year - a.year)
                .map((season) => (
                  <tr key={season.year}>
                    <td className="px-4 pt-2">{season.year}</td>
                    <td className="px-4 pt-2">{season.start}</td>
                    <td className="px-4 pt-2">{season.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";

export default function OldMatches() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate() - 1;

    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: {
        date:
          year +
          "-" +
          (month < 10 ? "0" : "") +
          month +
          "-" +
          (day < 10 ? "0" : "") +
          day,
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
      },
    };

    const fetchFixtures = async () => {
      try {
        const response = await axios.request(options);

        const filteredResponse = response.data.response.filter(
          (item) =>
            (item.league.name === "Premier League" &&
              item.league.country === "England") ||
            (item.league.name === "La Liga" &&
              item.league.country === "Spain") ||
            (item.league.name === "Bundesliga" &&
              item.league.country === "Germany") ||
            (item.league.name === "Serie A" &&
              item.league.country === "Italy") ||
            (item.league.name === "Ligue 1" &&
              item.league.country === "France") ||
            item.league.country === "USA"
        );

        setFixtures(filteredResponse);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-xl font-bold txt_gradient h-screen">
        Loading...
      </p>
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
    <>
      <div className="px-4 my-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          Old Matches
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
        {fixtures.map((data) => (
          <MatchCard key={data.fixture.id} data={data} />
        ))}
      </div>
    </>
  );
}

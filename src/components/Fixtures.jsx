"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import FixtureCard from "./FixtureCard";

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

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
            item.league.country === "England" ||
            item.league.country === "Spain" ||
            item.league.country === "Germany" ||
            item.league.country === "Italy" ||
            item.league.country === "France"
        );

        setFixtures(filteredResponse);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 select-none">
      {fixtures.map((data) => (
        <FixtureCard key={data.fixture.id} data={data} />
      ))}
    </div>
  );
}

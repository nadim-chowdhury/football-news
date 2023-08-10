"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import FixtureCard from "./FixtureCard";

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            item.league.country === "France" ||
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
      {fixtures.map((data) => (
        <FixtureCard key={data.fixture.id} data={data} />
      ))}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LeagueCard from "../../components/LeagueCard";

export default function Leagues() {
  const [epl, setEpl] = useState([]);
  const [laLiga, setLaLiga] = useState([]);
  const [bundesLiga, setBundesLiga] = useState([]);
  const [serieA, setSerieA] = useState([]);
  const [ligue1, setLigue1Data] = useState([]);
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
        const eplData = await fetchLeague("England");
        setEpl(eplData);

        const laLigaData = await fetchLeague("Spain");
        setLaLiga(laLigaData);

        const bundesLigaData = await fetchLeague("Germany");
        setBundesLiga(bundesLigaData);

        const serieAData = await fetchLeague("Italy");
        setSerieA(serieAData);

        const ligue1Data = await fetchLeague("France");
        setLigue1Data(ligue1Data);

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
        Error loading fixture data.
      </p>
    );
  }

  return (
    <section>
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          Top Leagues
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-4 gap-6">
        <LeagueCard league={epl} />
        <LeagueCard league={laLiga} />
        <LeagueCard league={bundesLiga} />
        <LeagueCard league={serieA} />
        <LeagueCard league={ligue1} />
      </div>
    </section>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LeagueCard from "../../components/LeagueCard";

export default function Leagues() {
  const [epl, setEpl] = useState([]);
  const [laLiga, setLaLiga] = useState([]);
  const [bundesLiga, setBundesLiga] = useState([]);
  const [serieA, setSerieA] = useState([]);

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
            item.league.name === "Serie A"
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="px-4 mb-14">
        <h2 className="text-3xl font-bold text-center txt_gradient">
          Top Leagues
        </h2>
      </div>

      <LeagueCard league={epl} />
      <LeagueCard league={laLiga} />
      <LeagueCard league={bundesLiga} />
      <LeagueCard league={serieA} />
    </section>
  );
}

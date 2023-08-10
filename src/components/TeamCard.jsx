"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function TeamCard({ teamId, league }) {
  const [teamData, setTeamData] = useState({});
  console.log("🚀 ~ file: TeamCard.jsx:8 ~ TeamCard ~ teamData:", teamData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/teams/statistics",
      params: {
        league: league,
        season: new Date().getFullYear().toString() - 1,
        team: teamId,
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setTeamData(response.data.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [league, teamId]);

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
    <div className="px-4 py-6 bg-white border rounded-lg">
      <div className="flex items-center justify-center">
        <Image
          src={teamData?.team?.logo}
          alt=""
          width={64}
          height={64}
          className="h-16 object-contain mr-6"
        />
        <h3 className="text-2xl font-bold txt_gradient">
          {teamData?.team?.name}
        </h3>
      </div>

      <div>
        <h3>{teamData?.form}</h3>
        <h3>{teamData?.clean_sheet?.home}</h3>
        <h3>{teamData?.clean_sheet?.away}</h3>
        <h3>{teamData?.clean_sheet?.total}</h3>
      </div>

      <div>
        <p>{teamData?.fixtures?.wins?.total}</p>
        <p>{teamData?.fixtures?.loses?.total}</p>
        <p>{teamData?.fixtures?.draws?.total}</p>
        <p>{teamData?.fixtures?.played?.total}</p>
      </div>

      <div>
        <p>{teamData?.biggest?.streak?.wins}</p>
        {/* <p>{teamData?.biggest?.wins?.home}</p>
        <p>{teamData?.biggest?.wins?.away}</p>
        <p>{teamData?.goals?.for?.total}</p> */}
      </div>
    </div>
  );
}

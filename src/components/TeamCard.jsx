"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function TeamCard({ teamId, league }) {
  const [teamData, setTeamData] = useState({});
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
      <p className="text-center text-xl font-bold txt_gradient h-screen">
        Loading...
      </p>
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
      <div className="flex items-center justify-center mb-4">
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

      <div className="mb-4">
        <h3 className="text-center border rounded-lg py-2 my-2">
          {teamData?.form.slice(24, 40)}
        </h3>
        <h3 className="txt_gradient text-center text-lg font-bold mt-4 mb-2">
          Clean Sheet
        </h3>
        <div className="flex justify-around">
          <p>Home: {teamData?.clean_sheet?.home}</p>
          <p>Away: {teamData?.clean_sheet?.away}</p>
          <p>Total: {teamData?.clean_sheet?.total}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="txt_gradient text-center text-lg font-bold mt-4 mb-2">
          Match
        </h3>
        <div className="flex justify-between text-center">
          <div className="md:flex md:justify-around w-[50%]">
            <p>Wins: {teamData?.fixtures?.wins?.total}</p>
            <p>Loses: {teamData?.fixtures?.loses?.total}</p>
          </div>
          <div className="md:flex md:justify-around w-[50%]">
            <p>Draws: {teamData?.fixtures?.draws?.total}</p>
            <p>Played: {teamData?.fixtures?.played?.total}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="txt_gradient text-center text-lg font-bold mt-4 mb-2">
          Records
        </h3>
        <div className="flex justify-between text-center">
          <div className="md:flex md:justify-around w-[50%]">
            <p>Biggest Wins: {teamData?.biggest?.streak?.wins}</p>
            <p>Home: {teamData?.biggest?.wins?.home}</p>
          </div>
          <div className="md:flex md:justify-around w-[50%]">
            <p>Away: {teamData?.biggest?.wins?.away}</p>
            <p>Goals Scored: {teamData?.goals?.for?.total?.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

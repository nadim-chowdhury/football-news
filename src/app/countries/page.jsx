"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Countries() {
  const itemsPerPage = 12;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(countries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
        {countries.slice(startIndex, endIndex).map((data, i) => (
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
            <h4 className="txt_gradient text-lg font-bold my-4 text-center">
              {data?.name ? data?.name : "Error 404"}
            </h4>
            <p>{data?.code ? data?.code : "Error 404"}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`primary_btn mr-4 ${
            currentPage === 1 && "disabled:opacity-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`primary_btn ${
            currentPage === totalPages && "disabled:opacity-50"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
}

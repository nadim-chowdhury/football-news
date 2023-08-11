import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function MatchStatistics() {
  const [fixtureStatastics, setFixtureStatastics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics",
      params: { fixture: "215662" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setFixtureStatastics(response.data.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-xl font-bold txt_gradient h-screen">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-xl font-bold txt_gradient h-screen">
        Error loading fixture data.
      </p>
    );
  }

  return (
    <div className="flex justify-between gap-6 md:flex-col">
      {fixtureStatastics ? (
        fixtureStatastics?.map((item, i) => (
          <div key={i + Math.random()} className="w-full">
            <h3 className="font-bold text-xl text-center lg:text-start txt_gradient mb-6 lg:my-6">
              {item?.team?.id === 463 ? "Home" : "Away"}
            </h3>
            <div className="rounded-lg overflow-hidden border py-2 md:py-0 bg-white md:bg-transparent md:border-0 w-full md:grid md:grid-cols-4 md:gap-4 ">
              {item?.statistics?.map((data, i) => (
                <div
                  key={i}
                  className="bg-white p-4 lg:flex lg:justify-between overflow-auto md:rounded-lg md:border py-2 text-center"
                >
                  <h4>{data?.type ? data?.type : "Unavailable"}</h4>
                  <p className="text-purple-500">
                    {data?.value ? data?.value : "Unavailable"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl font-bold text-center txt_gradient">
          This Data Currently Not Available
        </p>
      )}
    </div>
  );
}

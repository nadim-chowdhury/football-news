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
      <p className="text-center text-xl font-bold txt_gradient">
        Error loading fixture data.
      </p>
    );
  }

  return (
    <div className="flex justify-around">
      {fixtureStatastics ? (
        fixtureStatastics?.map((item, i) => (
          <div
            key={i + Math.random()}
            className="bg-white border p-4 rounded-lg w-[45%]"
          >
            <h3 className="font-bold text-lg text-center txt_gradient border-b pb-2 mb-2">
              {item?.team?.id === 463 ? "Home" : "Away"}
            </h3>
            {item?.statistics?.map((data, i) => (
              <div key={i} className="border-b py-2 text-center">
                <h4>{data?.type ? data?.type : "Unavailable"}</h4>
                <p className="text-slate-500">
                  {data?.value ? data?.value : "Unavailable"}
                </p>
              </div>
            ))}
            <p className="text-slate-500 text-center py-2">Unavailable</p>
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

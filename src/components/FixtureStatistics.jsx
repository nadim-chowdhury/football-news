import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function FixtureStatistics() {
  const [fixtureStatastics, setFixtureStatastics] = useState({});
  console.log(fixtureStatastics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics",
      params: { fixture: id },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setFixtureStatastics(response.data.response[0]);
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
    <div>
      {fixtureStatastics ? (
        fixtureStatastics?.statistics?.map((data, i) => (
          <div key={i}>
            <h4>{data?.type ? data?.type : "Not Available"}</h4>
            <p>{data?.value ? data?.value : "Not Available"}</p>
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

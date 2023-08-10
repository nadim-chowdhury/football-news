import Image from "next/image";

export default function LeagueCard({ league }) {
  return (
    <div className="bg-white border px-4 py-8 rounded-lg">
      {league.map((item) => (
        <div key={item.league.id}>
          <div className="flex flex-col lg:flex-row justify-center items-center mb-8">
            <div className="flex flex-col items-center justify-between lg:mr-8">
              <Image
                src={item.country.flag}
                alt=""
                width={72}
                height={72}
                className="h-16 object-contain"
              />
              <h3 className="txt_gradient font-bold text-xl border px-6 py-1 rounded-lg text-center mt-4">
                {item.country.name}
              </h3>
            </div>

            <div className="flex flex-col items-center justify-between mt-6 lg:mt-0">
              <Image
                src={item.league.logo}
                alt=""
                width={72}
                height={72}
                className="h-16 object-contain"
              />
              <h3 className="txt_gradient font-bold text-xl border px-6 py-1 rounded-lg text-center mt-4">
                {item.league.name}
              </h3>
            </div>
          </div>

          <table className="my-2 w-full text-center text-sm lg:text-base">
            <thead>
              <tr>
                <th scope="col" className="py-3 bg-slate-100 rounded-l-lg">
                  Year
                </th>
                <th scope="col" className="py-3 bg-slate-100">
                  Start Date
                </th>
                <th scope="col" className="py-3 bg-slate-100 rounded-r-lg">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {item.seasons
                .sort((a, b) => b.year - a.year)
                .map((season) => (
                  <tr key={season.year}>
                    <td className="px-4 pt-2">{season.year}</td>
                    <td className="px-4 pt-2">{season.start}</td>
                    <td className="px-4 pt-2">{season.end}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

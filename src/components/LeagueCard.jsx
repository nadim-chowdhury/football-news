import Image from "next/image";

export default function LeagueCard({ league }) {
  return (
    <div className="mx-4 mt-14 bg-white border px-4 py-8 rounded-lg">
      {league.map((item) => (
        <div key={item.league.id}>
          <div className="flex justify-center items-center mb-8">
            <div className="flex flex-col items-center justify-between mr-8">
              <Image
                src={item.country.flag}
                alt=""
                width={72}
                height={72}
                className="h-16 object-contain"
              />
              <h3 className="txt_gradient font-bold text-xl border px-4 py-1 rounded-lg text-center mt-4">
                {item.country.name}
              </h3>
            </div>

            <div className="flex flex-col items-center justify-between">
              <Image
                src={item.league.logo}
                alt=""
                width={72}
                height={72}
                className="h-16 object-contain"
              />
              <h3 className="txt_gradient font-bold text-xl border px-4 py-1 rounded-lg text-center mt-4">
                {item.league.name}
              </h3>
            </div>
          </div>

          <table className="my-2 w-full text-center">
            <thead>
              <tr>
                <th scope="col" class="px-6 py-3 bg-slate-100 rounded-l-lg">
                  Year
                </th>
                <th scope="col" class="px-6 py-3 bg-slate-100">
                  Start Date
                </th>
                <th scope="col" class="px-6 py-3 bg-slate-100 rounded-r-lg">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {item.seasons.map((season) => (
                <tr key={season.year}>
                  <td class="px-4 pt-2">{season.year}</td>
                  <td class="px-4 pt-2">{season.start}</td>
                  <td class="px-4 pt-2">{season.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

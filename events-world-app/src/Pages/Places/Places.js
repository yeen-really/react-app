import React, { useRef, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const api = {
  key: "146e662012a8d5a1987985ce3327ced1",
  base: "http://api.openweathermap.org/data/2.5/",
};

function Places() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [pollution, setPollution] = useState({});
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [co2, setCO2] = useState();
  const [nh3, setNH3] = useState();

  const searchPressed2 = () => {
    console.log("btn");
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result); 
        // не понимаю как исправить, если пытаться установить координаты здесь, то выходит ошибка что lat lon underfined
        // при первом нажатии в weather записываются полученные значени
        // на втором нажатии lat lnп записываются в форму ниже
        if (typeof weather.coord !== "undefined") {
          setLat(weather.coord.lat);
          setLng(weather.coord.lon);
        }
        console.log(result);
      });
  };
  const url =
    "http://api.openweathermap.org/data/2.5/air_pollution?lat=" +
    lat +
    "&lon=" +
    lng +
    "&appid=" +
    api.key;

  const searchPressed = () => {
    console.log("btn");
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setPollution(result);

        console.log(result);
      });

  };

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const data = [
    {
      name: "CO",
      value: pollution.list?.[0].components.co,
      refValue: 800,
    },
    {
      name: "NO3",
      value: pollution.list?.[0].components.nh3,
      refValue: 15,
    },
    {
      name: "NO",
      value: pollution.list?.[0].components.no,
      refValue: 20,
    },
    {
      name: "NO2",
      value: pollution.list?.[0].components.no2,
      refValue: 17,
    },    
    {
      name: "O3",
      value: pollution.list?.[0].components.o3,
      refValue: 20,
    },
    {
      name: "PM2_5",
      value: pollution.list?.[0].components.pm2_5,
      refValue: 30,
    },
    {
      name: "PM10",
      value: pollution.list?.[0].components.pm10,
      refValue: 20,
    },
    {
      name: "SO2",
      value: pollution.list?.[0].components.so2,
      refValue: 15,
    },
  ];

  return (
    <>
      <section className="py-16 px-24">
        <div className="flex flex-col">
          <div>
            <input
              type="text"
              placeholder="Введите город"
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded border-gray-300 p-2 mb-2"
            />
            <button
              onClick={searchPressed2}
              className="rounded p-2 ml-5 bg-blue-600 hover:bg-blue-700 text-gray-100 active:bg-gray-300"
            >
              {typeof weather.coord === "undefined" || search === ''
                ? "Искать"
                : "Использовать полученные координаты"}
            </button>
          </div>
        </div>

        {typeof weather.coord !== "undefined" ? (
          <>
            <input
              type="text"
              placeholder="Долгота"
              className="border rounded border-gray-300 p-2 mb-2"
              defaultValue={lat}
              ref={inputRef}
            />
            <input
              type="text"
              placeholder="Широта"
              className="border rounded border-gray-300 ml-2 p-2 mb-2"
              defaultValue={lng}
              ref={inputRef2}
            />
            {lat && lng && (
            <button
            onClick={searchPressed}
            className="rounded p-2 ml-5 bg-blue-600 hover:bg-blue-700 text-gray-100 active:bg-gray-300"
          >
            Искать по координатам
          </button>
            )}

          </>
        ) : (
          ""
        )}

        {typeof pollution.list !== "undefined" ? (
          <>
            <tbody className=" my-10">
              <tr className="">
                <th className="px-5 border border-gray-400 text-center">Показатель</th>
                <th className="px-5 border border-gray-400 text-center">Значение</th>
              </tr>
              <tr className="py-2 border">
                <td className="border border-gray-400 text-center">CO2</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.co}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">NH3</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.nh3}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">NO</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.no}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">NO2</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.no2}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">O3</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.o3}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">pm2_5</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.pm2_5}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">pm10</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.pm10}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 text-center">SO2</td>
                <td className="border border-gray-400 text-center">{pollution.list[0].components.so2}</td>
              </tr>
            </tbody>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="refValue"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default Places;

import React, { useCallback, useEffect, useState } from "react";
import { useGetGoodsQuery } from "../../redux/queryApi";
import { FormInput } from "../Auth/Input";

function CityInfo() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const { data = [] } = useGetGoodsQuery(
    `/air_pollution?lat=${lat}&lon=${lng}&appid=146e662012a8d5a1987985ce3327ced1`
  );
  const [co, setCO] = useState();
  const [nh3, setNH3] = useState();
  const [no, setNO] = useState();
  const [no2, setNO2] = useState();
  const [o2, setO2] = useState();
  const [pm2_5, setPM2_5] = useState();
  const [pm_10, setPM_10] = useState();
  const [so2, setSO2] = useState();

  function asyncCall() {
    if (typeof data.list !== "undefined") {
      setCO(data.list[0].components.co);
      setNH3(data.list[0].components.nh3);
      setNO(data.list[0].components.no);
      setNO2(data.list[0].components.no2);
      setO2(data.list[0].components.o2);
      setPM2_5(data.list[0].components.pm2_5);
      setPM_10(data.list[0].components.pm_10);
      setSO2(data.list[0].components.so2);
    }
  }
  const api = {
    key: "146e662012a8d5a1987985ce3327ced1",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  async function handleSubmit() {
    asyncCall();
    const response = await fetch("http://localhost:1337/cityinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
        co,
        nh3,
        no2,
        no,
        o2,
        pm2_5,
        pm_10,
        so2,
      }),
    });
    const data = await response.json();
  }

  const searchPressed2 = (e) => {
    e.preventDefault();
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        if (typeof weather.coord !== "undefined") {
          setLat(weather.coord.lat);
          setLng(weather.coord.lon);
        }
      });
  };

  return (
    <>
      {/* {pres} */}
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
            {typeof weather.coord === "undefined" || search === ""
              ? "Искать"
              : "Использовать полученные координаты"}
          </button>
          {typeof weather.coord !== "undefined"  ? (
            <button
              className="rounded p-2 ml-5 bg-blue-600 hover:bg-blue-700 text-gray-100 active:bg-gray-300"
              onClick={handleSubmit}
            >
              {typeof co !== "undefined"
                ? "Добавить в базу данных"
                : "Выбрать полученные значения"}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}></form>

      {typeof data.list !== "undefined" ? (
        <>
        <table>
        <tbody className=" my-10">
            <tr className="">
              <th className="px-5 border border-gray-400 text-center">
                Показатель
              </th>
              <th className="px-5 border border-gray-400 text-center">
                Значение
              </th>
            </tr>
            <tr className="py-2 border">
              <td className="border border-gray-400 text-center">CO2</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.co}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">NH3</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.nh3}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">NO</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.no}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">NO2</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.no2}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">O3</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.o3}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">pm2_5</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.pm2_5}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">pm10</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.pm10}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 text-center">SO2</td>
              <td className="border border-gray-400 text-center">
                {data.list[0].components.so2}
              </td>
            </tr>
          </tbody>
        </table>

        </>
      ) : (
        ""
      )}
    </>
  );
}

export default CityInfo;

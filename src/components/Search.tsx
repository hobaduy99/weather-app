"use client";
import React, { useState } from "react";
import { fetchCoordinates, fetchForecast } from "../services/weatherService";
import { fetchWeatherData } from "../services/weatherService";
import { ForecastData, SetWeather, WeatherProps } from "../common/weatherTypes";
import { saveSearchHistory } from "@/utils/storageUtils";

const Search: React.FC<{
  setWeather: SetWeather;
  setForecast: React.Dispatch<React.SetStateAction<ForecastData[]>>;
  setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isHomePage: boolean;
  weather: WeatherProps | null;
}> = ({
  setWeather,
  setForecast,
  setIsHomePage,
  isHomePage,
  weather,
  setIsLoading,
}) => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (query: string) => {
    const location = await fetchCoordinates(query);
    if (location) {
      setIsLoading(true);
      const weatherData = await fetchWeatherData(location.lat, location.lon);
      const forecastData = await fetchForecast(location.lat, location.lon);
      if (weatherData) {
        setWeather(weatherData);
        saveSearchHistory(
          `${weatherData.city}, ${weatherData.country}`,
          location.lat,
          location.lon
        );
      }
      if (forecastData.length > 0) {
        setForecast(forecastData);
      }
    } else {
      setWeather(null);
      setForecast([]);
    }
    setIsLoading(false);
    setIsHomePage(true);
    setShowSearch(!showSearch);
    setQuery("");
  };
  return (
    <div className="bg-white text-black shadow-md w-full mb-6 items-center">
      <nav className="relative bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <button
                className={`block py-2 px-3 md:p-0 ${
                  isHomePage
                    ? "text-white md:bg-transparent md:text-blue-700 "
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                } `}
                onClick={() => setIsHomePage(true)}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`block py-2 px-3 md:p-0 ${
                  !isHomePage
                    ? "text-white md:bg-transparent md:text-blue-700 "
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                } `}
                onClick={() => setIsHomePage(false)}
              >
                History
              </button>
            </li>
          </ul>

          <div className="absolute left-1/2 -translate-x-1/2 w-110 flex items-center bg-white text-xl">
            <svg
              className="w-8 h-8 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
              />
            </svg>
            {weather && (
              <span className="mx-3 text-gray-700 font-medium">
                {weather.city}, {weather.country}
              </span>
            )}

            {!showSearch && (
              <button
                className="ml-auto hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 p-2 rounded-md"
                onClick={() => setShowSearch(!showSearch)}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {showSearch && (
          <div className="flex items-center justify-center w-110 mx-auto mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              placeholder="Enter city name..."
            />
            <button
              disabled={!query}
              onClick={() => handleSearch(query)}
              className={`ml-2 font-bold py-2 px-4 rounded-md transition-all ${
                !query
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Search
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Search;

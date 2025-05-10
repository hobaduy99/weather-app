"use client";
import { ForecastData, SetWeather } from "@/common/weatherTypes";
import { fetchForecast, fetchWeatherData } from "@/services/weatherService";
import { getSearchHistory } from "@/utils/storageUtils";
import React, { useEffect, useState } from "react";

const History: React.FC<{
  setWeather: SetWeather;
  setForecast: React.Dispatch<React.SetStateAction<ForecastData[]>>;
  setIsHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setWeather, setForecast, setIsHomePage, setIsLoading }) => {
  const [history, setHistory] = useState<
    { city: string; lon: number; lat: number }[]
  >([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const handleDelete = (city: string): void => {
    const updatedHistory = history.filter(
      (item: { city: string }) => item.city !== city
    );

    // Corrected localStorage update (stringify before saving)
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Update state with new filtered history
    setHistory(updatedHistory);
  };

  const handleSearch = async (history: {
    city: string;
    lon: number;
    lat: number;
  }) => {
    setIsLoading(true);
    const weatherData = await fetchWeatherData(history.lat, history.lon);
    const forecastData = await fetchForecast(history.lat, history.lon);
    if (weatherData) {
      setWeather(weatherData);
    }
    if (forecastData.length > 0) {
      setForecast(forecastData);
    }
    setIsHomePage(true);
    setIsLoading(false);
  };

  return (
    <>
      <div className="text-left mt-6 w-110">
        <h2 className="text-xl font-bold mb-2">Search History</h2>
      </div>
      {history.length > 0 ? (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-110 ">
          {history.map((history, index) => (
            <div key={index} className="mx-auto grid grid-cols-2 p-4">
              <div className="flex justify-start items-center">
                <p className="text-lg ">{history.city}</p>
              </div>
              <div className="flex justify-end items-center">
                <button
                  className="hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 p-2 rounded-md"
                  onClick={() => handleSearch(history)}
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

                {/* Delete Button */}
                <button
                  className="hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 p-2 rounded-md"
                  onClick={() => handleDelete(history.city)}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-left mt-6 w-110">
          <p className="text-red-500">No search history found.</p>
        </div>
      )}
    </>
  );
};

export default History;

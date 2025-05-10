"use client";
import React from "react";
import { ForecastData } from "../common/weatherTypes";
import Forecast from "./Forecast";

const ForecastList: React.FC<{ forecastData: ForecastData[] }> = ({
  forecastData,
}) => {
  const groupedForecasts = forecastData.reduce<Record<string, ForecastData[]>>(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
    },
    {}
  );

  const isToday = (date: string) => {
    return new Date(date).getDate() === new Date().getDate();
  };

  return (
    <>
      <div className="text-left mt-6 w-110">
        <h2 className="text-xl font-bold mb-2">5-Day Forecast (3 Hours)</h2>
      </div>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-110 mx-auto">
        <div className="grid grid-cols-1 items-center">
          {Object.entries(groupedForecasts).map(([date, forecasts]) => (
            <div key={date} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">
                {isToday(date) ? "Today" : date}
              </h3>
              {forecasts.map((weather, index) => (
                <Forecast key={index} weather={weather} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ForecastList;

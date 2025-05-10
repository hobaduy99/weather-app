/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { ForecastData } from "../common/weatherTypes";
import { WEATHER_ICONS_URL } from "@/common/contants";

const Forecast: React.FC<{ weather: ForecastData }> = ({ weather }) => {
  return (
    <div className="rounded-lg grid grid-cols-[0.5fr_3.5fr_2fr] gap-2">
      <div className="flex justify-start items-center">
        <p className="text-sm font-semibold">{weather.time}</p>
      </div>
      <div className="flex items-center justify-start">
        <img
          src={`${WEATHER_ICONS_URL}/${weather.icon}@2x.png`}
          alt="Weather icon"
          className="w-16 h-16"
        />
        <p className="text-sm text-center text-gray-400">
          {weather.temperatureMin}°C / {weather.temperatureMax}°C
        </p>
      </div>
      <div className="flex justify-end items-center">
        <p className="text-sm font-semibold">{weather.description}</p>
      </div>
    </div>
  );
};

export default Forecast;

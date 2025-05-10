/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { WeatherProps } from "../common/weatherTypes";
import { WEATHER_ICONS_URL } from "@/common/contants";

const WeatherSummary: React.FC<{ weather: WeatherProps }> = ({ weather }) => {
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-110 mx-auto">
      <p className="text-lg">{weather.date}</p>
      <div className="grid grid-cols-2 gap-2 items-center">
        <img
          src={`${WEATHER_ICONS_URL}/${weather.icon}@2x.png`}
          alt="Weather icon"
          className="w-50 col-span-1"
        />
        <div className="ml-4 col-span-1 justify-center">
          <p className="text-5xl font-bold">{weather.temperature}°C</p>
          <p className="text-lg">{weather.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <span className="text-center">
          <p className="text-base text-gray-400">Humidity</p>
          <p className="font-bold text-lg">{weather.humidity}%</p>
        </span>
        <span className="text-center">
          <p className="text-base text-gray-400">Wind</p>
          <p className="font-bold text-lg">
            <span
              className="inline-block transform "
              style={{ rotate: `${weather.windDirection}deg` }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                ></path>
              </svg>
            </span>
            <span className="ml-1">{weather.windSpeed} m/s</span>
          </p>
        </span>
        <span className="text-center">
          <p className="text-base text-gray-400">Visibility</p>
          <p className="font-bold text-lg">{weather.visibility} km</p>
        </span>
      </div>
    </div>
  );
};

export default WeatherSummary;

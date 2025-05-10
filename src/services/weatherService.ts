import {
  FORECAST_CALL,
  GEO_CALL,
  WEATHER_API_KEY,
  WEATHER_CALL,
} from "@/common/contants";
import {
  ForecastData,
  ForecastEntry,
  LocationResponse,
  WeatherProps,
} from "@/common/weatherTypes";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchWeatherData = async (
  lat: number,
  lon: number
): Promise<WeatherProps | null> => {
  try {
    const response = await axios.get(`${WEATHER_CALL}`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
      },
    });
    return {
      city: response.data.name,
      country: response.data.sys.country,
      date: new Date(response.data.dt * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      icon: response.data.weather[0].icon,
      visibility: Math.round(response.data.visibility / 1000),
    };
  } catch (error) {
    toast.error("Error fetching weather data. Please try again!");
    console.error("Error fetching weather data", error);
    return null;
  }
};

export const fetchForecast = async (
  lat: number,
  lon: number
): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(`${FORECAST_CALL}`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
      },
    });

    return response.data.list.map((entry: ForecastEntry) => ({
      date: new Date(entry.dt * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }),
      time: new Date(entry.dt * 1000).toISOString().slice(11, 16),
      temperatureMin: entry.main.temp_min,
      temperatureMax: entry.main.temp_max,
      description: entry.weather[0].description,
      icon: entry.weather[0].icon,
    }));
  } catch (error) {
    toast.error("Error fetching forecast data. Please try again!");
    console.error("Error fetching forecast data", error);
    return [];
  }
};

export const fetchCoordinates = async (
  city: string
): Promise<LocationResponse | null> => {
  try {
    const response = await axios.get(`${GEO_CALL}`, {
      params: { q: city, limit: 1, appid: WEATHER_API_KEY },
    });

    if (response.data.length > 0) {
      return { lat: response.data[0].lat, lon: response.data[0].lon };
    }

    return null;
  } catch (error) {
    toast.error("Error fetching coordinates. Please try again!");
    console.error("Error fetching coordinates", error);
    return null;
  }
};

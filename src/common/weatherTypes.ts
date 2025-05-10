// export interface WeatherProps {
//   city: string;
//   country: string;
//   date: string;
//   temperature: number;
//   description: string;
//   humidity: number;
//   windSpeed: number;
//   windDirection: number;
//   visibility: number;
//   icon: string;
// }

export interface WeatherProps {
  city: string;
  country: string;
  date: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  icon: string;
}

export interface ForecastData {
  date: string;
  time: string;
  temperatureMin: number;
  temperatureMax: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  icon: string;
}

export type SetWeather = React.Dispatch<
  React.SetStateAction<WeatherProps | null>
>;

export interface ForecastEntry {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastResponse {
  list: ForecastEntry[];
}

export interface LocationResponse {
  lat: number;
  lon: number;
}

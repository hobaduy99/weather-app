export const BASE_URL = "https://api.openweathermap.org";

export const WEATHER_CALL = BASE_URL + "/data/2.5/weather/?units=metric&";

export const FORECAST_CALL = BASE_URL + "/data/2.5/forecast/?units=metric&";

export const GEO_CALL = BASE_URL + "/geo/1.0/direct";

export const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const DEFAULT_CITY = "Singapore";

export const UNIT_METRIC = "metric";

export const WEATHER_ICONS_URL = "https://openweathermap.org/img/wn";

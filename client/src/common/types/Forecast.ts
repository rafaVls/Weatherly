export interface Forecast {
  current: Current;
  daily: Daily[];
  hourly: Hourly[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

interface Current extends CommonConditions, Sun, Visibility {}

interface Daily extends CommonConditions, Pop, Moon, Sun {}

interface Hourly extends CommonConditions, Pop, Visibility {}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface FeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

interface Pop {
  pop: number;
}

interface Visibility {
  visibility: number;
}

interface Temp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

interface Moon {
  moon_phase: number;
  moonrise: number;
  moonset: number;
}

interface Sun {
  sunrise: number;
  sunset: number;
}

interface CommonConditions {
  clouds: number;
  dew_points: number;
  dt: number;
  feels_like: number | FeelsLike;
  humidity: number;
  pressure: number;
  temp: number | Temp;
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

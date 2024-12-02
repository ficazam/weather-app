import { useEffect, useState } from "react";
import { useCityWeatherStore } from "../store/cities.store";
import { useNavigate } from "react-router-dom";
import { getWindDirection } from "../store/utils/wind_direction.util";
import { weatherItem } from "../core/weatherItem.interface";
import { BackButton } from "../components/BackButton";
import { DetailsHeader } from "../components/DetailsHeader";
import { DetailsFooter } from "../components/DetailsFooter";
import { WeatherCard } from "../components/WeatherCard";
import { DetailsCharts } from "../components/DetailsCharts";

export const DetailsPage = () => {
  const [weather, setWeather] = useState<weatherItem | null>(null);
  const { cityWeather } = useCityWeatherStore();
  const nav = useNavigate();

  useEffect(() => {
    if (!cityWeather || cityWeather === null) {
      nav("/");
      console.log("No city chosen, redirecting...");
    }

    setWeather(cityWeather);
  }, [cityWeather]);

  return (
    <main className="flex flex-col items-center p-4 text-white min-h-screen mt-[200%] sm:mt-0">
      <BackButton />
      <DetailsHeader weather={weather} />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-[65%] sm:w-full max-w-4xl">
        <WeatherCard title="Temperature">
          <p id="current-temp">Current: {(weather?.main.temp! - 273.15).toFixed(2)}°C</p>
          <p id="feels-like-temp">Feels Like: {(weather?.main.feels_like! - 273.15).toFixed(2)}°C</p>
          <p>
            Min: {(weather?.main.temp_min! - 273.15).toFixed(2)}°C | Max:{" "}
            {(weather?.main.temp_max! - 273.15).toFixed(2)}°C
          </p>
        </WeatherCard>
        <WeatherCard title="Atmosphere">
          <p>Pressure: {weather?.main.pressure} hPa</p>
          <p>Humidity: {weather?.main.humidity}%</p>
          {weather?.visibility! > 1000 ? (
            <p>Visibility: {(weather?.visibility! / 1000).toFixed(2)}Km </p>
          ) : (
            <p>{weather?.visibility}</p>
          )}
        </WeatherCard>{" "}
        <WeatherCard title="Wind & Clouds">
          <p>Wind Speed: {weather?.wind.speed} m/s</p>
          <p>Wind Direction: {getWindDirection(weather?.wind.deg!)}</p>
          <p>Cloudiness: {weather?.clouds.all}%</p>
        </WeatherCard>{" "}
      </section>

      <DetailsFooter weather={weather} />

      <DetailsCharts weather={weather} />
    </main>
  );
};

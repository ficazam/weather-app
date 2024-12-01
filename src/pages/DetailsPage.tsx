import { useEffect, useState } from "react";
import { useCityWeatherStore } from "../store/cities.store";
import { useNavigate } from "react-router-dom";
import { getWindDirection } from "../store/utils/wind_direction.util";
import { weatherItem } from "../core/weatherItem.interface";
import { TemperatureGauge } from "../components/TemperatureGauge";
import { TemperatureComparison } from "../components/MinMaxTemps";

export const DetailsPage = () => {
  const [weather, setWeather] = useState<weatherItem | null>(null);
  const { cityWeather, emptyWeather } = useCityWeatherStore();
  const nav = useNavigate();

  useEffect(() => {
    if (!cityWeather || cityWeather === null) {
      nav("/");
      console.log("No city chosen, redirecting...");
    }

    setWeather(cityWeather);
  }, [cityWeather]);

  return (
    <main className="flex flex-col items-center p-4 text-white min-h-screen">
      <button
        type="button"
        className="absolute top-[2%] left-[2%] border border-blue-700 py-2 px-7 rounded hover:bg-blue-700"
        onClick={() => emptyWeather()}
      >
        Back to Search
      </button>
      <header className="w-full text-center mb-8">
        <h1 className="text-3xl font-bold">
          {weather?.name}, {weather?.sys.country}
        </h1>
        <p className="text-sm text-gray-400">
          Coordinates: {weather?.coord.lat}, {weather?.coord.lon}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt={weather?.weather[0].description}
          className="mx-auto mt-4"
        />
        <h2 className="text-2xl font-medium mt-2">
          {weather?.weather[0].main}
        </h2>
        <p className="text-gray-300">{weather?.weather[0].description}</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Temperature</h3>
          <p>Current: {(weather?.main.temp! - 273.15).toFixed(2)}°C</p>
          <p>Feels Like: {(weather?.main.feels_like! - 273.15).toFixed(2)}°C</p>
          <p>
            Min: {(weather?.main.temp_min! - 273.15).toFixed(2)}°C | Max:{" "}
            {(weather?.main.temp_max! - 273.15).toFixed(2)}°C
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Atmosphere</h3>
          <p>Pressure: {weather?.main.pressure} hPa</p>
          <p>Humidity: {weather?.main.humidity}%</p>
          {weather?.visibility! > 1000 ? (
            <p>Visibility: {(weather?.visibility! / 1000).toFixed(2)}Km </p>
          ) : (
            <p>{weather?.visibility}m</p>
          )}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Wind & Clouds</h3>
          <p>Wind Speed: {weather?.wind.speed} m/s</p>
          <p>Wind Direction: {getWindDirection(weather?.wind.deg!)}</p>
          <p>Cloudiness: {weather?.clouds.all}%</p>
        </div>
      </section>

      <div className="w-full text-center mt-8 text-gray-400">
        <p>
          Sunrise:{" "}
          {new Date(weather?.sys.sunrise! * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          Sunset:{" "}
          {new Date(weather?.sys.sunset! * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>Timezone Offset: {weather?.timezone! / 3600} hours</p>
      </div>

      <div className="flex items-center justify-between w-full">
        <TemperatureGauge
          currentTemp={
            Math.round((weather?.main.temp! - 273.15 + Number.EPSILON) * 100) /
            100
          }
          feelsLikeTemp={
            Math.round(
              (weather?.main.feels_like! - 273.15 + Number.EPSILON) * 100
            ) / 100
          }
        />

        <TemperatureComparison
          maxTemp={
            Math.round(
              (weather?.main.temp_max! - 273.15 + Number.EPSILON) * 100
            ) / 100
          }
          minTemp={
            Math.round(
              (weather?.main.temp_min! - 273.15 + Number.EPSILON) * 100
            ) / 100
          }
          feelsLike={
            Math.round(
              (weather?.main.feels_like! - 273.15 + Number.EPSILON) * 100
            ) / 100
          }
        />
      </div>
    </main>
  );
};

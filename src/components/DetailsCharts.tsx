import { weatherItem } from "../core/weatherItem.interface";
import { TemperatureComparison } from "./MinMaxTemps";
import { TemperatureGauge } from "./TemperatureGauge";

export const DetailsCharts = ({ weather }: { weather: weatherItem | null }) => (
  <div className="flex flex-col sm:flex-row mt-10 sm:mt-0 items-center justify-between w-full">
    <TemperatureGauge
      currentTemp={
        Math.round((weather?.main.temp! - 273.15 + Number.EPSILON) * 100) / 100
      }
      feelsLikeTemp={
        Math.round(
          (weather?.main.feels_like! - 273.15 + Number.EPSILON) * 100
        ) / 100
      }
    />

    <TemperatureComparison
      maxTemp={
        Math.round((weather?.main.temp_max! - 273.15 + Number.EPSILON) * 100) /
        100
      }
      minTemp={
        Math.round((weather?.main.temp_min! - 273.15 + Number.EPSILON) * 100) /
        100
      }
      feelsLike={
        Math.round(
          (weather?.main.feels_like! - 273.15 + Number.EPSILON) * 100
        ) / 100
      }
    />
  </div>
);

import { weatherItem } from "../core/weatherItem.interface";

export const DetailsHeader = ({ weather }: { weather: weatherItem | null }) => {
  return (
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
      <h2 className="text-2xl font-medium mt-2">{weather?.weather[0].main}</h2>
      <p className="text-gray-300">{weather?.weather[0].description}</p>
    </header>
  );
};

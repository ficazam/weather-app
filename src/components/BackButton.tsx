import { useCityWeatherStore } from "../store/cities.store";

export const BackButton = () => {
  const { emptyWeather } = useCityWeatherStore();

  return (
    <button
      type="button"
      className="relative sm:absolute sm:top-[2%] sm:left-[2%] mt-[-15%] mb-[20%] sm:mb-0 sm:mt-0 mr-[60%] sm:mr-0 border border-blue-700 py-2 px-7 rounded hover:bg-blue-700"
      onClick={() => emptyWeather()}
    >
      Back to Search
    </button>
  );
};

import axios from "axios";
import { create } from "zustand";
import { weatherItem } from "../core/weatherItem.interface";

interface WeatherItems {
  cityWeather: weatherItem | null;
  cityList: string[];
  emptyWeather: () => void,
  emptyCityList: () => void;
  cityFetch: (value: string) => void;
  cityWeatherFetch: (city: string) => void;
}

export const useCityWeatherStore = create<WeatherItems>()((set) => ({
  cityWeather: null,
  cityList: [],
  emptyCityList: () => set((state) => ({ ...state, cityList: [] })),
  emptyWeather: () => set((state) => ({ ...state, cityWeather: null })),
  cityFetch: async (value: string) => {
    try {
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}&limit=50`;
      const headers = {
        "x-rapidapi-key": `${import.meta.env.VITE_CITIES_API_KEY}`,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      };

      const resp = await axios(url, { headers });
      const data = await resp.data.data;
      const cityNames = data.map((city: any) => `${city.city}, ${city.country}`);
      console.log(cityNames)

      set((state) => ({ ...state, cityList: cityNames }));
    } catch (error) {
      console.error("Could not fetch suggestions: ", error);
    }
  },
  cityWeatherFetch: async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`;
      const resp = await axios(url);
      const data = await resp.data;

      console.log(data);
      set((state) => ({ ...state, cityWeather: data }));
      return data.name
    } catch (error) {
      console.error("Could not fetch weather: ", error);
    }
  },
}));

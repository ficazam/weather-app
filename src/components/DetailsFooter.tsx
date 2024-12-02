import { weatherItem } from "../core/weatherItem.interface"

export const DetailsFooter = ({ weather }: { weather: weatherItem | null }) => {
    return (
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
    )
}
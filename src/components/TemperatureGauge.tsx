import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Label,
  Tooltip,
} from "recharts";

interface TemperatureGaugeProps {
  currentTemp: number;
  feelsLikeTemp: number;
}

export const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({
  currentTemp,
  feelsLikeTemp,
}) => {
  const calculateDomainAndTicks = (min: number, max: number) => {
    const range = max - min;
    const step = range / 7;
    const ticks = Array.from({ length: 8 }, (_, i) => ({
      value: Math.round(min + i * step),
      angle: 90 + (360 / 8) * i,
    })).slice(0, -1);
    return { domain: [min, max], ticks };
  };

  const currentTempRange =
    currentTemp > 0
      ? { min: 0, max: Math.round(currentTemp + 10) }
      : { min: Math.round(currentTemp - 10), max: 5 };

  const feelsLikeTempRange =
    feelsLikeTemp > 0
      ? { min: 0, max: Math.round(feelsLikeTemp + 10) }
      : { min: Math.round(feelsLikeTemp - 10), max: 5 };

  const { domain: currentDomain, ticks: currentTicks } =
    calculateDomainAndTicks(currentTempRange.min, currentTempRange.max);
  const { domain: feelsLikeDomain, ticks: feelsLikeTicks } =
    calculateDomainAndTicks(feelsLikeTempRange.min, feelsLikeTempRange.max);

  return (
    <div className="temperature-gauge">
      <h2 className="text-center text-xl font-semibold">Temperature Gauge</h2>

      <div className="flex justify-evenly items-center space-x-16">
        <div className="text-center flex flex-col">
          <p className="my-2">Current Temperature</p>
          <RadialBarChart
            width={200}
            height={150}
            innerRadius="50%"
            outerRadius="80%"
            data={[{ name: "Current", value: currentTemp }]}
            startAngle={
              90 -
              ((0 - currentTempRange.min) /
                (currentTempRange.max - currentTempRange.min)) *
                360
            }
            endAngle={
              450 -
              ((0 - currentTempRange.min) /
                (currentTempRange.max - currentTempRange.min)) *
                360
            }
          >
            <PolarAngleAxis
              type="number"
              domain={currentDomain}
              tickFormatter={(tick) => `${tick}°C`}
              // @ts-ignore
              ticks={currentTicks.map((tick) => tick.value)}
              tick={{ fill: "#fff", fontSize: 12 }}
              tickCount={7}
            />
            <RadialBar
              background={{ fill: "#ddd" }}
              fill="#8884d8"
              dataKey="value"
            />
            <Label
              value={`Current: ${currentTemp}°C`}
              position="center"
              fill="#fff"
            />
            <Tooltip />
          </RadialBarChart>
        </div>

        <div className="text-center">
          <p className="my-2">Feels Like</p>

          <RadialBarChart
            width={200}
            height={150}
            innerRadius="50%"
            outerRadius="80%"
            data={[{ name: "Feels Like", value: feelsLikeTemp }]}
            startAngle={
              90 -
              ((0 - feelsLikeTempRange.min) /
                (feelsLikeTempRange.max - feelsLikeTempRange.min)) *
                360
            }
            endAngle={
              450 -
              ((0 - feelsLikeTempRange.min) /
                (feelsLikeTempRange.max - feelsLikeTempRange.min)) *
                360
            }
          >
            {" "}
            <PolarAngleAxis
              type="number"
              domain={feelsLikeDomain}
              tickFormatter={(tick) => `${tick}°C`}
              // @ts-ignore
              ticks={feelsLikeTicks.map((tick) => tick.value)}
              tick={{ fill: "#fff", fontSize: 12 }}
              tickCount={7}
            />
            <RadialBar
              background={{ fill: "#ddd" }}
              fill="#82ca9d"
              dataKey="value"
            >
              <Label
                value={`Feels Like: ${feelsLikeTemp}°C`}
                position="center"
                fill="#fff"
              />
            </RadialBar>
            <Tooltip />
          </RadialBarChart>
        </div>
      </div>
    </div>
  );
};

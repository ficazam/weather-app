import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TemperatureComparisonProps {
  minTemp: number;
  maxTemp: number;
  feelsLike: number
}

export const TemperatureComparison: React.FC<TemperatureComparisonProps> = ({ minTemp, maxTemp, feelsLike }) => {
  const data = [
    {
      name: 'Temperature',
      min: minTemp,
      max: maxTemp,
      feel: feelsLike
    },
  ];

  const maximumTemp = maxTemp > feelsLike ? maxTemp : feelsLike
  const minimumTemp = minTemp < feelsLike ? minTemp : feelsLike

  const yAxisDomain = minimumTemp <= 0 ? [Math.round(minimumTemp - 10), Math.round(maximumTemp + 10)] : [0, Math.round(maximumTemp + 10)]

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <h3 className="text-white text-xl mb-4">Temperature Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={20} barCategoryGap={100}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={yAxisDomain} tickCount={220} />
          <Tooltip />
          <Legend />
          <Bar dataKey="min" fill="#00BFFF" barSize={35} />
          <Bar dataKey="max" fill="#FF4500" barSize={35} />
          <Bar dataKey="feel" fill="#32CD32" barSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


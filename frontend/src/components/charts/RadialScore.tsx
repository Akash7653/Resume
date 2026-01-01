import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

interface RadialScoreProps {
  score: number;
  maxScore?: number;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const RadialScore = ({ score, maxScore = 100, size = 'medium', label = '' }: RadialScoreProps) => {
  const normalizedScore = (score / maxScore) * 100;
  
  const data = [
    {
      name: label,
      value: normalizedScore,
      fill: normalizedScore >= 75 ? '#10b981' : normalizedScore >= 50 ? '#3b82f6' : normalizedScore >= 25 ? '#f59e0b' : '#ef4444',
    },
  ];

  const getSize = () => {
    switch (size) {
      case 'small': return { width: 100, height: 100, fontSize: 'text-xl' };
      case 'large': return { width: 150, height: 150, fontSize: 'text-3xl' };
      default: return { width: 120, height: 120, fontSize: 'text-2xl' };
    }
  };

  const { width, height, fontSize } = getSize();

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={width} height={height}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center -mt-20">
        <p className={`${fontSize} font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>{score}</p>
        {label && <p className="text-sm text-gray-600">{label}</p>}
      </div>
    </div>
  );
};

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

export const Progress = ({ value, max = 100, className = '', showLabel = false, color = 'blue' }: ProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${colorClasses[color]} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 mt-1">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

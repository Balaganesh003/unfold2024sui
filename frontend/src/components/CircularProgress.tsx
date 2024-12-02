export function CircularProgress({ value, maxValue }: { value: number, maxValue: number }) {
  const percentage = (value / maxValue) * 100;

  // Determine the color based on the value range
  let strokeColor = 'stroke-red-500/80'; // Default color for 0-30
  if (percentage >= 30 && percentage < 60) {
    strokeColor = 'stroke-yellow-500/80'; // Color for 30-60
  } else if (percentage >= 60) {
    strokeColor = 'stroke-green-500/80'; // Color for 60-100
  }

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="stroke-gray-700 fill-none"
          strokeWidth="8"
          cx="50"
          cy="50"
          r="45"
        />
        {/* Progress circle */}
        <circle
          className={`${strokeColor} fill-none transform -rotate-90 origin-center`}
          strokeWidth="8"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${percentage * 2.827} 282.7`}
        />
        <text
          x="50"
          y="50"
          className="fill-white text-2xl font-bold"
          dominantBaseline="middle"
          textAnchor="middle">
          {value}
        </text>
      </svg>
    </div>
  );
}

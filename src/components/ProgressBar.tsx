import * as React from "react";

interface ProgressBarProps {
  progress: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="w-full max-w-lg p-2">
      <p className="text-sm font-semibold">{label}</p>
      <div className="w-full bg-gray-200 rounded-lg h-4 mt-1">
        <div
          className="h-full bg-blue-500 rounded-lg transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-1">{progress.toFixed(2)}%</p>
    </div>
  );
};

export default ProgressBar;

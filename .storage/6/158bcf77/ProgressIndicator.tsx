import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
}

export default function ProgressIndicator({ currentSection, totalSections }: ProgressIndicatorProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-amber-900">Training Progress</span>
        <span className="text-sm font-medium text-amber-900">{currentSection + 1} / {totalSections}</span>
      </div>
      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              index <= currentSection
                ? 'bg-amber-600 border-amber-600 text-white'
                : 'bg-white border-amber-200 text-amber-400'
            }`}
          >
            {index < currentSection ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="text-xs font-semibold">{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
}

export default function ProgressIndicator({ currentSection, totalSections }: ProgressIndicatorProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;

  // Determine color based on current section
  const getProgressColor = () => {
    const sectionNames = ['intro', 'bad', 'average', 'excellent', 'reflection', 'assessment'];
    const currentSectionName = sectionNames[currentSection];
    
    if (currentSectionName === 'bad') {
      return 'from-red-600 to-red-500';
    } else if (currentSectionName === 'average') {
      return 'from-amber-600 to-amber-500';
    } else if (currentSectionName === 'excellent') {
      return 'from-green-600 to-green-500';
    }
    return 'from-amber-600 to-orange-500';
  };

  const getStepColor = (index: number) => {
    const sectionNames = ['intro', 'bad', 'average', 'excellent', 'reflection', 'assessment'];
    const sectionName = sectionNames[index];
    
    if (index <= currentSection) {
      if (sectionName === 'bad') {
        return 'bg-red-600 border-red-600';
      } else if (sectionName === 'average') {
        return 'bg-amber-600 border-amber-600';
      } else if (sectionName === 'excellent') {
        return 'bg-green-600 border-green-600';
      }
      return 'bg-amber-600 border-amber-600';
    }
    return 'bg-white border-amber-200';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 px-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-sm font-medium text-amber-900">Training Progress</span>
        <span className="text-xs md:text-sm font-medium text-amber-900">{currentSection + 1} / {totalSections}</span>
      </div>
      <div className="h-2 bg-amber-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-3 md:mt-4 gap-1 md:gap-2">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 shadow-sm ${getStepColor(index)} ${
              index <= currentSection ? 'text-white' : 'text-amber-400'
            }`}
          >
            {index < currentSection ? (
              <Check className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <span className="text-[10px] md:text-xs font-semibold">{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
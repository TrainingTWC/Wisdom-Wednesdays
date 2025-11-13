import { Card } from '@/components/ui/card';
import { VisualCue } from '@/types/assessment';
import { User, Volume2, Hand } from 'lucide-react';

interface VisualCueDisplayProps {
  cues: VisualCue[];
  facialExpression: string;
  toneIndicator: string;
  bodyLanguage: string;
}

export default function VisualCueDisplay({ cues, facialExpression, toneIndicator, bodyLanguage }: VisualCueDisplayProps) {
  const getIconComponent = (type: string) => {
    switch (type) {
      case 'expression':
        return <User className="w-4 h-4 md:w-5 md:h-5" />;
      case 'tone':
        return <Volume2 className="w-4 h-4 md:w-5 md:h-5" />;
      case 'body-language':
        return <Hand className="w-4 h-4 md:w-5 md:h-5" />;
      default:
        return null;
    }
  };

  const getColorScheme = (type: string) => {
    switch (type) {
      case 'expression':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'tone':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'body-language':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-700';
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Visual Cues Grid - Combined */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
        {cues.map((cue, index) => {
          // Get the corresponding text for each cue type
          let detailText = '';
          if (cue.type === 'expression') detailText = facialExpression;
          if (cue.type === 'tone') detailText = toneIndicator;
          if (cue.type === 'body-language') detailText = bodyLanguage;

          return (
            <Card
              key={index}
              className={`border p-3 md:p-4 ${getColorScheme(cue.type)} shadow-sm animate-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <div className="p-2 md:p-2.5 rounded-xl bg-white shadow-sm">{getIconComponent(cue.type)}</div>
                <div className="text-4xl md:text-5xl">{cue.icon}</div>
                <p className="font-semibold text-xs uppercase tracking-wide">{cue.label}</p>
                <p className="text-xs leading-relaxed text-neutral-600">{cue.description}</p>
                {/* Add the specific detail text */}
                {detailText && detailText !== cue.icon && (
                  <div className="pt-2 border-t border-current/20 w-full">
                    <p className="text-xs md:text-sm font-medium text-neutral-800">{detailText}</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
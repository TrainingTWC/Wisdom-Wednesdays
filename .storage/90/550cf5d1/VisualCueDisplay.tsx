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
      {/* Large Facial Expression */}
      <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 md:p-6 shadow-sm">
        <div className="text-center">
          <div className="text-7xl md:text-[132px] mb-2 md:mb-3 animate-in zoom-in duration-500">{facialExpression}</div>
          <p className="text-xs md:text-sm font-semibold text-blue-700 uppercase tracking-wide">Facial Expression</p>
        </div>
      </Card>

      {/* Visual Cues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
        {cues.map((cue, index) => (
          <Card
            key={index}
            className={`border p-3 md:p-4 ${getColorScheme(cue.type)} shadow-sm animate-in slide-in-from-bottom-4 duration-500`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center space-y-1.5 md:space-y-2">
              <div className="p-2 md:p-2.5 rounded-xl bg-white shadow-sm">{getIconComponent(cue.type)}</div>
              <div className="text-2xl md:text-[28px]">{cue.icon}</div>
              <p className="font-semibold text-xs uppercase tracking-wide">{cue.label}</p>
              <p className="text-xs leading-relaxed text-neutral-600">{cue.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Tone & Body Language Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
        <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-3 md:p-4 shadow-sm">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />
            <p className="font-semibold text-purple-700 uppercase text-xs tracking-wide">Tone of Voice</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-[28px] flex-shrink-0">🗣️</div>
            <p className="text-neutral-800 font-medium text-xs md:text-sm">{toneIndicator}</p>
          </div>
        </Card>

        <Card className="border border-green-200 bg-gradient-to-br from-green-50 to-white p-3 md:p-4 shadow-sm">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Hand className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
            <p className="font-semibold text-green-700 uppercase text-xs tracking-wide">Body Language</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-[28px] flex-shrink-0">🧍</div>
            <p className="text-neutral-800 font-medium text-xs md:text-sm">{bodyLanguage}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
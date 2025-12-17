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
        return <User className="w-6 h-6" />;
      case 'tone':
        return <Volume2 className="w-6 h-6" />;
      case 'body-language':
        return <Hand className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getColorScheme = (type: string) => {
    switch (type) {
      case 'expression':
        return 'bg-blue-50 border-blue-300 text-blue-700';
      case 'tone':
        return 'bg-purple-50 border-purple-300 text-purple-700';
      case 'body-language':
        return 'bg-green-50 border-green-300 text-green-700';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Large Facial Expression */}
      <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="text-center">
          <div className="text-9xl mb-4 animate-in zoom-in duration-500">{facialExpression}</div>
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Facial Expression</p>
        </div>
      </Card>

      {/* Visual Cues Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {cues.map((cue, index) => (
          <Card
            key={index}
            className={`border-2 p-4 ${getColorScheme(cue.type)} animate-in slide-in-from-bottom-4 duration-500`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-white shadow-md">{getIconComponent(cue.type)}</div>
              <div className="text-4xl">{cue.icon}</div>
              <p className="font-bold text-sm uppercase tracking-wide">{cue.label}</p>
              <p className="text-xs leading-relaxed">{cue.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Tone & Body Language Indicators */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-white p-4">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="w-5 h-5 text-purple-600" />
            <p className="font-bold text-purple-700 uppercase text-sm">Tone of Voice</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl">🗣️</div>
            <p className="text-purple-900 font-medium">{toneIndicator}</p>
          </div>
        </Card>

        <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-white p-4">
          <div className="flex items-center gap-3 mb-2">
            <Hand className="w-5 h-5 text-green-600" />
            <p className="font-bold text-green-700 uppercase text-sm">Body Language</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl">🧍</div>
            <p className="text-green-900 font-medium">{bodyLanguage}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
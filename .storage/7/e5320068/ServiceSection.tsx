import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceSectionProps {
  title: string;
  subtitle: string;
  description: string;
  takeaway: string;
  imageDescription: string;
  quote?: string;
  caption?: string;
  colorScheme: 'cold' | 'neutral' | 'warm' | 'mirror';
}

export default function ServiceSection({
  title,
  subtitle,
  description,
  takeaway,
  imageDescription,
  quote,
  caption,
  colorScheme,
}: ServiceSectionProps) {
  const [showTakeaway, setShowTakeaway] = useState(false);

  const colorClasses = {
    cold: 'from-slate-100 to-blue-100 border-slate-300',
    neutral: 'from-gray-100 to-stone-100 border-gray-300',
    warm: 'from-amber-50 to-orange-50 border-amber-300',
    mirror: 'from-purple-50 to-pink-50 border-purple-300',
  };

  const badgeColors = {
    cold: 'bg-slate-600 hover:bg-slate-700',
    neutral: 'bg-gray-600 hover:bg-gray-700',
    warm: 'bg-amber-600 hover:bg-amber-700',
    mirror: 'bg-purple-600 hover:bg-purple-700',
  };

  return (
    <Card className={`border-2 bg-gradient-to-br ${colorClasses[colorScheme]} transition-all duration-300 hover:shadow-xl`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{title}</CardTitle>
            <CardDescription className="text-lg font-semibold text-gray-700">{subtitle}</CardDescription>
          </div>
          <Badge className={`${badgeColors[colorScheme]} text-white`}>
            {colorScheme === 'cold' ? 'Bad' : colorScheme === 'neutral' ? 'Average' : colorScheme === 'warm' ? 'Excellent' : 'Reflection'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Placeholder */}
        <div className={`relative w-full h-64 rounded-lg overflow-hidden border-2 ${
          colorScheme === 'cold' ? 'bg-gradient-to-br from-slate-200 to-blue-200 border-slate-400' :
          colorScheme === 'neutral' ? 'bg-gradient-to-br from-gray-200 to-stone-200 border-gray-400' :
          colorScheme === 'warm' ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-400' :
          'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-400'
        } flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]`}>
          <div className="text-center p-6">
            <div className="text-6xl mb-4">
              {colorScheme === 'cold' ? '❄️' : colorScheme === 'neutral' ? '🤖' : colorScheme === 'warm' ? '☕' : '🪞'}
            </div>
            <p className="text-sm text-gray-600 italic">{imageDescription}</p>
          </div>
        </div>

        {caption && (
          <p className="text-center text-sm font-medium text-gray-700 italic bg-white/50 p-3 rounded-lg">
            "{caption}"
          </p>
        )}

        {/* Description */}
        <div className="bg-white/70 p-4 rounded-lg">
          <p className="text-gray-800 leading-relaxed">{description}</p>
        </div>

        {/* Quote */}
        {quote && (
          <div className={`p-4 rounded-lg border-l-4 ${
            colorScheme === 'cold' ? 'bg-slate-50 border-slate-600' :
            colorScheme === 'neutral' ? 'bg-gray-50 border-gray-600' :
            'bg-amber-50 border-amber-600'
          }`}>
            <p className="text-lg font-semibold text-gray-900 italic">"{quote}"</p>
          </div>
        )}

        {/* Interactive Takeaway */}
        <div className="mt-4">
          <button
            onClick={() => setShowTakeaway(!showTakeaway)}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
              showTakeaway 
                ? 'bg-amber-600 text-white shadow-lg' 
                : 'bg-white/80 text-gray-900 hover:bg-white hover:shadow-md'
            }`}
          >
            <span className="font-semibold">
              {showTakeaway ? 'Key Takeaway' : 'Click to reveal key takeaway'}
            </span>
            {showTakeaway ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {showTakeaway && (
            <div className="mt-3 p-4 bg-amber-50 border-2 border-amber-600 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <p className="text-gray-900 font-medium leading-relaxed">{takeaway}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
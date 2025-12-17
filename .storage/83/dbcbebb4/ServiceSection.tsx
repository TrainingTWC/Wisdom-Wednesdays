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
    cold: 'from-red-50 to-red-100 border-red-200',
    neutral: 'from-amber-50 to-amber-100 border-amber-200',
    warm: 'from-green-50 to-green-100 border-green-200',
    mirror: 'from-purple-50 to-pink-50 border-purple-200',
  };

  const badgeColors = {
    cold: 'bg-red-600 hover:bg-red-700',
    neutral: 'bg-amber-600 hover:bg-amber-700',
    warm: 'bg-green-600 hover:bg-green-700',
    mirror: 'bg-purple-600 hover:bg-purple-700',
  };

  const imageColors = {
    cold: 'bg-gradient-to-br from-red-200 to-red-300 border-red-300',
    neutral: 'bg-gradient-to-br from-amber-200 to-amber-300 border-amber-300',
    warm: 'bg-gradient-to-br from-green-200 to-green-300 border-green-300',
    mirror: 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300',
  };

  const quoteColors = {
    cold: 'bg-red-50 border-red-600',
    neutral: 'bg-amber-50 border-amber-600',
    warm: 'bg-green-50 border-green-600',
    mirror: 'bg-purple-50 border-purple-600',
  };

  const takeawayColors = {
    cold: 'bg-red-600 hover:bg-red-700',
    neutral: 'bg-amber-600 hover:bg-amber-700',
    warm: 'bg-green-600 hover:bg-green-700',
    mirror: 'bg-purple-600 hover:bg-purple-700',
  };

  const takeawayBgColors = {
    cold: 'bg-red-50 border-red-500',
    neutral: 'bg-amber-50 border-amber-500',
    warm: 'bg-green-50 border-green-500',
    mirror: 'bg-purple-50 border-purple-500',
  };

  return (
    <Card className={`border bg-gradient-to-br ${colorClasses[colorScheme]} transition-all duration-300 hover:shadow-xl rounded-xl`}>
      <CardHeader className="px-4 md:px-6 pt-4 md:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{title}</CardTitle>
            <CardDescription className="text-base md:text-lg font-semibold text-gray-700">{subtitle}</CardDescription>
          </div>
          <Badge className={`${badgeColors[colorScheme]} text-white shadow-sm self-start`}>
            {colorScheme === 'cold' ? 'Bad' : colorScheme === 'neutral' ? 'Average' : colorScheme === 'warm' ? 'Excellent' : 'Reflection'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6">
        {/* Image Placeholder */}
        <div className={`relative w-full h-48 md:h-64 rounded-xl overflow-hidden border ${imageColors[colorScheme]} flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] shadow-sm`}>
          <div className="text-center p-4 md:p-6">
            <div className="text-5xl md:text-6xl mb-3 md:mb-4">
              {colorScheme === 'cold' ? '❄️' : colorScheme === 'neutral' ? '🤖' : colorScheme === 'warm' ? '☕' : '🪞'}
            </div>
            <p className="text-xs md:text-sm text-gray-600 italic px-2">{imageDescription}</p>
          </div>
        </div>

        {caption && (
          <p className="text-center text-xs md:text-sm font-medium text-gray-700 italic bg-white/50 p-3 rounded-xl">
            "{caption}"
          </p>
        )}

        {/* Description */}
        <div className="bg-white/70 p-3 md:p-4 rounded-xl shadow-sm">
          <p className="text-sm md:text-base text-gray-800 leading-relaxed">{description}</p>
        </div>

        {/* Quote */}
        {quote && (
          <div className={`p-3 md:p-4 rounded-xl border-l-4 shadow-sm ${quoteColors[colorScheme]}`}>
            <p className="text-base md:text-lg font-semibold text-gray-900 italic">"{quote}"</p>
          </div>
        )}

        {/* Interactive Takeaway */}
        <div className="mt-4">
          <button
            onClick={() => setShowTakeaway(!showTakeaway)}
            className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl transition-all duration-300 min-h-[44px] ${
              showTakeaway 
                ? `${takeawayColors[colorScheme]} text-white shadow-lg` 
                : 'bg-white/80 text-gray-900 hover:bg-white hover:shadow-md'
            }`}
          >
            <span className="font-semibold text-sm md:text-base">
              {showTakeaway ? 'Key Takeaway' : 'Click to reveal key takeaway'}
            </span>
            {showTakeaway ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
          </button>
          {showTakeaway && (
            <div className={`mt-3 p-3 md:p-4 border rounded-xl animate-in slide-in-from-top-2 duration-300 shadow-sm ${takeawayBgColors[colorScheme]}`}>
              <p className="text-sm md:text-base text-gray-900 font-medium leading-relaxed">{takeaway}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
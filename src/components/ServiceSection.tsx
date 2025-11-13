import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useRef } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);

  // Split description into three sections
  const descriptionSections = description.split('\n\n\n').filter(section => section.trim());

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || showTakeaway) return;

      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if user has scrolled near the bottom of the card
      // Card bottom is visible and within 100px of viewport bottom
      const isNearBottom = cardRect.bottom <= windowHeight + 100 && cardRect.bottom > windowHeight - 200;

      if (isNearBottom) {
        setShowTakeaway(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check on mount as well
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTakeaway]);

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
    <Card ref={cardRef} className={`border bg-gradient-to-br ${colorClasses[colorScheme]} transition-all duration-300 hover:shadow-xl rounded-xl`}>
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

        {/* Description - Three Separate Cards */}
        <div className="space-y-4">
          {descriptionSections.map((section, index) => (
            <div key={index} className="bg-white/70 p-4 md:p-5 rounded-xl shadow-sm border border-white/40">
              <p className="text-sm md:text-base text-gray-800 leading-relaxed">{section.trim()}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        {quote && (
          <div className={`p-3 md:p-4 rounded-xl border-l-4 shadow-sm ${quoteColors[colorScheme]}`}>
            <p className="text-base md:text-lg font-semibold text-gray-900 italic">"{quote}"</p>
          </div>
        )}

        {/* Interactive Takeaway - Prominent Design */}
        <div className="mt-6">
          {!showTakeaway ? (
            <button
              onClick={() => setShowTakeaway(true)}
              className="w-full group relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-2xl bg-gradient-to-br from-white via-white to-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="text-5xl md:text-6xl animate-bounce-slow">💡</div>
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Key Takeaway
                  </p>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    Tap to reveal the essential lesson
                  </p>
                </div>
                <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
              </div>
            </button>
          ) : (
            <div className={`relative overflow-hidden rounded-2xl border-4 shadow-2xl animate-in zoom-in-95 duration-500 ${takeawayBgColors[colorScheme]}`}>
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">🎯</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Key Takeaway</h3>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-inner border border-white/50">
                  <p className="text-base md:text-lg text-gray-900 font-semibold leading-relaxed">{takeaway}</p>
                </div>
                <button
                  onClick={() => setShowTakeaway(false)}
                  className="mt-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 mx-auto"
                >
                  <ChevronUp className="w-5 h-5" />
                  <span className="text-sm">Hide</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
import { Card } from '@/components/ui/card';
import { IndicatorScore } from '@/types/assessment';
import { Heart, Smile, Shield, Flame } from 'lucide-react';

interface IndicatorTrackerProps {
  scores: IndicatorScore;
  compact?: boolean;
}

export default function IndicatorTracker({ scores, compact = false }: IndicatorTrackerProps) {
  const indicators = [
    {
      key: 'empathy' as keyof IndicatorScore,
      label: 'Empathy',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
    },
    {
      key: 'approachability' as keyof IndicatorScore,
      label: 'Approachability',
      icon: Smile,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      key: 'reliability' as keyof IndicatorScore,
      label: 'Reliability',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      key: 'warmth' as keyof IndicatorScore,
      label: 'Warmth',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {indicators.map((indicator) => {
          const score = scores[indicator.key];
          const Icon = indicator.icon;
          return (
            <div key={indicator.key} className={`${indicator.bgColor} border ${indicator.borderColor} rounded-xl p-3 text-center transition-all duration-300`}>
              <Icon className={`w-4 h-4 ${indicator.color} mx-auto mb-1.5`} />
              <p className="text-xs font-semibold text-neutral-700 mb-1">{indicator.label}</p>
              <p className={`text-lg font-bold ${score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {score > 0 ? '+' : ''}
                {score}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {indicators.map((indicator) => {
        const score = scores[indicator.key];
        const Icon = indicator.icon;
        return (
          <Card key={indicator.key} className={`${indicator.bgColor} border ${indicator.borderColor} p-4 shadow-sm`}>
            <div className="flex flex-col items-center text-center">
              <Icon className={`w-6 h-6 ${indicator.color} mb-2`} />
              <p className="text-xs font-semibold text-neutral-700 mb-1">{indicator.label}</p>
              <p className={`text-2xl font-bold ${score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {score > 0 ? '+' : ''}
                {score}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
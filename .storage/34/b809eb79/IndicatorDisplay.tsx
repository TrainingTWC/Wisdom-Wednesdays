import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IndicatorScore } from '@/types/assessment';
import { Heart, Smile, Shield, Flame } from 'lucide-react';

interface IndicatorDisplayProps {
  scores: IndicatorScore;
  maxPerIndicator: number;
}

export default function IndicatorDisplay({ scores, maxPerIndicator }: IndicatorDisplayProps) {
  const indicators = [
    {
      key: 'empathy' as keyof IndicatorScore,
      label: 'Empathy',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-300',
      progressColor: 'bg-pink-500',
      description: 'Understanding customer emotions',
    },
    {
      key: 'approachability' as keyof IndicatorScore,
      label: 'Approachability',
      icon: Smile,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      progressColor: 'bg-blue-500',
      description: 'Being welcoming and friendly',
    },
    {
      key: 'reliability' as keyof IndicatorScore,
      label: 'Reliability',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      progressColor: 'bg-green-500',
      description: 'Being dependable and consistent',
    },
    {
      key: 'warmth' as keyof IndicatorScore,
      label: 'Warmth',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      progressColor: 'bg-orange-500',
      description: 'Creating genuine connection',
    },
  ];

  const getPercentage = (score: number) => {
    return ((score + maxPerIndicator) / (maxPerIndicator * 2)) * 100;
  };

  const getScoreLabel = (score: number) => {
    if (score >= maxPerIndicator * 0.7) return 'Excellent';
    if (score >= maxPerIndicator * 0.4) return 'Good';
    if (score >= 0) return 'Developing';
    if (score >= maxPerIndicator * -0.4) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {indicators.map((indicator) => {
        const score = scores[indicator.key];
        const percentage = getPercentage(score);
        const scoreLabel = getScoreLabel(score);
        const Icon = indicator.icon;

        return (
          <Card key={indicator.key} className={`border-2 ${indicator.borderColor} ${indicator.bgColor} p-4`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-full bg-white shadow-md ${indicator.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`font-bold text-sm uppercase ${indicator.color}`}>{indicator.label}</p>
                <p className="text-xs text-gray-600">{indicator.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{score}</span>
                <span className={`text-sm font-semibold ${score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {scoreLabel}
                </span>
              </div>
              <Progress value={percentage} className={`h-2 ${indicator.progressColor}`} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>-{maxPerIndicator}</span>
                <span>0</span>
                <span>+{maxPerIndicator}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
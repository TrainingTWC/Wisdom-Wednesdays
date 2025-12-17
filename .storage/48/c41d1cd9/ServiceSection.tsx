import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lightbulb, AlertCircle, Star } from 'lucide-react';
import { useState } from 'react';

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  level: 'introduction' | 'bad' | 'average' | 'excellent' | 'reflection';
  emoji: string;
  content: {
    overview: string;
    keyPoints: string[];
    scenarios?: Array<{
      title: string;
      situation: string;
      impact: string;
      lesson: string;
    }>;
    reflectionQuestions?: string[];
    practicalTips: string[];
  };
  onComplete: (sectionId: string) => void;
}

export default function ServiceSection({ id, title, description, level, emoji, content, onComplete }: ServiceSectionProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(id);
  };

  const getLevelStyles = () => {
    switch (level) {
      case 'bad':
        return {
          gradient: 'from-red-500/10 to-red-600/5',
          border: 'border-red-200/50',
          accent: 'text-red-600',
          bg: 'bg-red-50/50',
        };
      case 'average':
        return {
          gradient: 'from-yellow-500/10 to-yellow-600/5',
          border: 'border-yellow-200/50',
          accent: 'text-yellow-600',
          bg: 'bg-yellow-50/50',
        };
      case 'excellent':
        return {
          gradient: 'from-green-500/10 to-green-600/5',
          border: 'border-green-200/50',
          accent: 'text-green-600',
          bg: 'bg-green-50/50',
        };
      case 'reflection':
        return {
          gradient: 'from-purple-500/10 to-purple-600/5',
          border: 'border-purple-200/50',
          accent: 'text-purple-600',
          bg: 'bg-purple-50/50',
        };
      default:
        return {
          gradient: 'from-blue-500/10 to-blue-600/5',
          border: 'border-blue-200/50',
          accent: 'text-blue-600',
          bg: 'bg-blue-50/50',
        };
    }
  };

  const styles = getLevelStyles();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Card */}
      <Card className={`border ${styles.border} bg-gradient-to-br ${styles.gradient} backdrop-blur-sm shadow-sm`}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="text-6xl">{emoji}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-1 tracking-tight">{title}</h2>
              <p className="text-neutral-600 text-sm font-medium">{description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview */}
      <Card className="border border-neutral-200/50 shadow-sm">
        <CardContent className="pt-6">
          <p className="text-neutral-700 leading-relaxed">{content.overview}</p>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="border border-neutral-200/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-neutral-900">Key Points</h3>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {content.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-amber-700">{index + 1}</span>
                </div>
                <span className="text-neutral-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Scenarios */}
      {content.scenarios && content.scenarios.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-neutral-600" />
            Real-World Scenarios
          </h3>
          {content.scenarios.map((scenario, index) => (
            <Card key={index} className="border border-neutral-200/50 shadow-sm">
              <CardHeader>
                <h4 className="text-base font-semibold text-neutral-900">{scenario.title}</h4>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-xl ${styles.bg} border ${styles.border}`}>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Situation:</p>
                  <p className="text-neutral-800">{scenario.situation}</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/50">
                  <p className="text-sm font-medium text-neutral-600 mb-1">Impact:</p>
                  <p className="text-neutral-800">{scenario.impact}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50">
                  <p className="text-sm font-medium text-amber-700 mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    Key Lesson:
                  </p>
                  <p className="text-neutral-800 font-medium">{scenario.lesson}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reflection Questions */}
      {content.reflectionQuestions && content.reflectionQuestions.length > 0 && (
        <Card className="border border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 shadow-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold text-neutral-900">Reflect on These Questions</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {content.reflectionQuestions.map((question, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-purple-700">{index + 1}</span>
                  </div>
                  <span className="text-neutral-700 leading-relaxed font-medium">{question}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Practical Tips */}
      <Card className="border border-neutral-200/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-neutral-900">Practical Tips</h3>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5">
            {content.practicalTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/50">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700 leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Complete Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleComplete}
          disabled={isCompleted}
          size="lg"
          className="px-8 py-6 text-base font-medium bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/20 rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Section Completed
            </>
          ) : (
            <>
              Mark as Complete
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
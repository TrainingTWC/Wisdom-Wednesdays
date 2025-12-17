import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge, IndicatorScore } from '@/types/assessment';
import { Trophy, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import IndicatorDisplay from './IndicatorDisplay';

interface AssessmentResultsProps {
  totalScore: number;
  maxScore: number;
  minScore: number;
  indicatorScores: IndicatorScore;
  maxPerIndicator: number;
  earnedBadge: Badge;
  onRestart: () => void;
}

export default function AssessmentResults({
  totalScore,
  maxScore,
  minScore,
  indicatorScores,
  maxPerIndicator,
  earnedBadge,
  onRestart,
}: AssessmentResultsProps) {
  const scoreRange = maxScore - minScore;
  const normalizedScore = totalScore - minScore;
  const percentage = (normalizedScore / scoreRange) * 100;

  const getPerformanceLevel = () => {
    if (percentage >= 85) return { level: 'Outstanding', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (percentage >= 70) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 55) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 40) return { level: 'Developing', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const performanceLevel = getPerformanceLevel();

  const getFeedbackMessage = () => {
    if (percentage >= 85) {
      return "Outstanding performance! You demonstrate exceptional ability to read visual cues and respond with perfect balance across all indicators. Your empathy, approachability, reliability, and warmth create unforgettable customer experiences.";
    }
    if (percentage >= 70) {
      return "Excellent work! You consistently show strong skills in reading customer emotions and responding appropriately. Your balanced approach across empathy, approachability, reliability, and warmth builds meaningful connections.";
    }
    if (percentage >= 55) {
      return "Good progress! You're developing solid skills in visual observation and emotional response. Focus on strengthening your weaker indicators to create more consistent customer experiences.";
    }
    if (percentage >= 40) {
      return "You're developing! Continue practicing reading facial expressions, tone, and body language. Pay attention to how your responses impact all four indicators: empathy, approachability, reliability, and warmth.";
    }
    return "Keep learning! Visual empathy is a skill that grows with practice. Review the scenarios, focus on observing customer cues more carefully, and consider how each response affects the four key indicators.";
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Main Results Card */}
      <Card className="border border-neutral-200/50 bg-white shadow-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="text-7xl">{earnedBadge.emoji}</div>
          </div>
          <CardTitle className="text-2xl font-semibold text-neutral-900 mb-2 tracking-tight">Assessment Complete!</CardTitle>
          <p className="text-sm text-neutral-600 font-medium">Your Visual Empathy Performance</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Score Display */}
          <div className={`p-6 rounded-xl ${performanceLevel.bg} border border-neutral-200/50`}>
            <div className="text-center mb-4">
              <p className="text-xs text-neutral-600 mb-2 uppercase tracking-wide font-medium">Your Total Score</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                {totalScore >= 0 ? (
                  <TrendingUp className="w-7 h-7 text-green-600" />
                ) : (
                  <TrendingDown className="w-7 h-7 text-red-600" />
                )}
                <p className={`text-5xl font-bold ${totalScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalScore > 0 ? '+' : ''}
                  {totalScore}
                </p>
              </div>
              <p className="text-xs text-neutral-500 mb-2">
                Range: {minScore} to +{maxScore}
              </p>
              <p className={`text-xl font-semibold ${performanceLevel.color}`}>{performanceLevel.level}</p>
            </div>
            <Progress value={percentage} className="h-2.5 mb-2" />
            <p className="text-center text-xs text-neutral-600 font-medium">{percentage.toFixed(0)}% Performance Score</p>
          </div>

          {/* Badge Earned */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200/50">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{earnedBadge.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <p className="font-semibold text-lg text-neutral-900">{earnedBadge.name}</p>
                </div>
                <p className="text-neutral-700 text-sm">{earnedBadge.description}</p>
              </div>
            </div>
          </div>

          {/* Indicator Breakdown */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200/50">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 text-center">Performance Indicators</h3>
            <IndicatorDisplay scores={indicatorScores} maxPerIndicator={maxPerIndicator} />
          </div>

          {/* Personalized Feedback */}
          <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-amber-500">
            <p className="font-semibold text-base text-neutral-900 mb-3">📊 Performance Analysis</p>
            <p className="text-neutral-700 leading-relaxed text-sm">{getFeedbackMessage()}</p>
          </div>

          {/* Indicator Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200/50">
            <p className="font-semibold text-neutral-900 mb-3 text-center text-sm">💡 Key Insights</p>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-neutral-200/50">
                <p className="font-semibold text-pink-600 mb-1">💗 Empathy</p>
                <p className="text-neutral-700">Understanding and sharing customer feelings</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200/50">
                <p className="font-semibold text-blue-600 mb-1">😊 Approachability</p>
                <p className="text-neutral-700">Being welcoming and easy to talk to</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200/50">
                <p className="font-semibold text-green-600 mb-1">🛡️ Reliability</p>
                <p className="text-neutral-700">Being consistent and dependable</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200/50">
                <p className="font-semibold text-orange-600 mb-1">🔥 Warmth</p>
                <p className="text-neutral-700">Creating genuine human connection</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={onRestart} 
              size="lg"
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-6 text-base font-medium shadow-lg shadow-amber-500/20 rounded-xl transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Assessment
            </Button>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="flex-1 border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 py-6 text-base font-medium rounded-xl transition-all duration-300"
            >
              Review Training
            </Button>
          </div>

          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-l-4 border-amber-500 text-center">
            <p className="text-base font-semibold text-neutral-900 italic">
              "The most important thing in communication is hearing what isn't said."
            </p>
            <p className="text-xs text-neutral-600 mt-2">- Peter Drucker</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
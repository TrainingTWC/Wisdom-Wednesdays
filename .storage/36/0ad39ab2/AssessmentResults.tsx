import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge as BadgeUI } from '@/components/ui/badge';
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Main Results Card */}
      <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="text-8xl animate-bounce">{earnedBadge.emoji}</div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</CardTitle>
          <p className="text-lg text-gray-600">Your Visual Empathy Performance</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className={`p-6 rounded-lg ${performanceLevel.bg} border-2 border-amber-300`}>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">Your Total Score</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                {totalScore >= 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-600" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-red-600" />
                )}
                <p className={`text-6xl font-bold ${totalScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalScore > 0 ? '+' : ''}
                  {totalScore}
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Range: {minScore} to +{maxScore}
              </p>
              <p className={`text-2xl font-bold ${performanceLevel.color}`}>{performanceLevel.level}</p>
            </div>
            <Progress value={percentage} className="h-3 mb-2" />
            <p className="text-center text-sm text-gray-600">{percentage.toFixed(0)}% Performance Score</p>
          </div>

          {/* Badge Earned */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-300">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{earnedBadge.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <p className="font-bold text-xl text-gray-900">{earnedBadge.name}</p>
                </div>
                <p className="text-gray-700">{earnedBadge.description}</p>
              </div>
            </div>
          </div>

          {/* Indicator Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-amber-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Performance Indicators</h3>
            <IndicatorDisplay scores={indicatorScores} maxPerIndicator={maxPerIndicator} />
          </div>

          {/* Personalized Feedback */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600">
            <p className="font-semibold text-lg text-gray-900 mb-3">📊 Performance Analysis</p>
            <p className="text-gray-700 leading-relaxed">{getFeedbackMessage()}</p>
          </div>

          {/* Indicator Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-300">
            <p className="font-semibold text-gray-900 mb-3 text-center">💡 Key Insights</p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-pink-600 mb-1">💗 Empathy</p>
                <p className="text-gray-700">Understanding and sharing customer feelings</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-blue-600 mb-1">😊 Approachability</p>
                <p className="text-gray-700">Being welcoming and easy to talk to</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-green-600 mb-1">🛡️ Reliability</p>
                <p className="text-gray-700">Being consistent and dependable</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-orange-600 mb-1">🔥 Warmth</p>
                <p className="text-gray-700">Creating genuine human connection</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onRestart} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Assessment
            </Button>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              variant="outline"
              className="flex-1 border-2 border-amber-600 text-amber-700 hover:bg-amber-50 py-6 text-lg"
            >
              Review Training
            </Button>
          </div>

          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-l-4 border-amber-600 text-center">
            <p className="text-lg font-semibold text-gray-900 italic">
              "The most important thing in communication is hearing what isn't said."
            </p>
            <p className="text-sm text-gray-600 mt-2">- Peter Drucker</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
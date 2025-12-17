import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/types/assessment';
import { Trophy, Heart, Star, Sparkles, RotateCcw } from 'lucide-react';

interface AssessmentResultsProps {
  totalScore: number;
  maxScore: number;
  earnedBadge: Badge;
  onRestart: () => void;
}

export default function AssessmentResults({ totalScore, maxScore, earnedBadge, onRestart }: AssessmentResultsProps) {
  const percentage = (totalScore / maxScore) * 100;

  const getEmpathyLevel = () => {
    if (percentage >= 90) return { level: 'Empathy Master', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (percentage >= 75) return { level: 'Connection Expert', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 60) return { level: 'Growing Empath', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 45) return { level: 'Developing Skills', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Keep Learning', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const empathyLevel = getEmpathyLevel();

  const getFeedbackMessage = () => {
    if (percentage >= 90) {
      return "Outstanding! You have an exceptional ability to understand and connect with customers. Your empathy creates memorable experiences that turn first-time visitors into loyal regulars.";
    }
    if (percentage >= 75) {
      return "Great work! You consistently show strong empathy and understanding. Customers feel valued and heard when they interact with you. Keep nurturing these connection skills.";
    }
    if (percentage >= 60) {
      return "Good progress! You're developing solid empathy skills. Focus on reading emotional cues and responding with genuine warmth to elevate your customer connections.";
    }
    if (percentage >= 45) {
      return "You're on the right track! Continue practicing active listening and putting yourself in customers' shoes. Small improvements in empathy create big differences in service quality.";
    }
    return "Keep learning! Empathy is a skill that grows with practice. Review the training materials and focus on understanding customer emotions before responding. You've got this!";
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
          <p className="text-lg text-gray-600">Your Empathy Journey Results</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className={`p-6 rounded-lg ${empathyLevel.bg} border-2 border-amber-300`}>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">Your Empathy Score</p>
              <p className="text-6xl font-bold text-amber-700 mb-2">
                {totalScore}
                <span className="text-3xl text-gray-500">/{maxScore}</span>
              </p>
              <p className={`text-2xl font-bold ${empathyLevel.color}`}>{empathyLevel.level}</p>
            </div>
            <Progress value={percentage} className="h-3 mb-2" />
            <p className="text-center text-sm text-gray-600">{percentage.toFixed(0)}% Empathy Mastery</p>
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

          {/* Personalized Feedback */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600">
            <div className="flex items-start gap-3 mb-3">
              <Heart className="w-6 h-6 text-pink-500 mt-1" />
              <p className="font-semibold text-lg text-gray-900">Personalized Feedback</p>
            </div>
            <p className="text-gray-700 leading-relaxed">{getFeedbackMessage()}</p>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center border-2 border-blue-200">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 mb-1">Empathy Score</p>
              <p className="text-2xl font-bold text-blue-600">{percentage.toFixed(0)}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
              <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 mb-1">Connection Level</p>
              <p className="text-2xl font-bold text-green-600">{empathyLevel.level.split(' ')[0]}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center border-2 border-purple-200">
              <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 mb-1">Points Earned</p>
              <p className="text-2xl font-bold text-purple-600">{totalScore}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={onRestart}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
            >
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
              "Empathy is seeing with the eyes of another, listening with the ears of another, and feeling with the heart of another."
            </p>
            <p className="text-sm text-gray-600 mt-2">- Alfred Adler</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
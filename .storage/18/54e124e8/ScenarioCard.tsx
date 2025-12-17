import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scenario, ScenarioOption } from '@/types/assessment';
import { useState } from 'react';
import { Check, X, Heart, Sparkles } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onAnswer: (option: ScenarioOption) => void;
  scenarioNumber: number;
  totalScenarios: number;
}

export default function ScenarioCard({ scenario, onAnswer, scenarioNumber, totalScenarios }: ScenarioCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState<ScenarioOption | null>(null);

  const handleOptionClick = (option: ScenarioOption) => {
    setSelectedOption(option.id);
    setSelectedOptionData(option);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null);
      setShowFeedback(false);
      setSelectedOptionData(null);
    }, 2500);
  };

  const getEmpathyColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'bg-green-500 hover:bg-green-600';
      case 'good':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'neutral':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'poor':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getFeedbackIcon = (level: string) => {
    if (level === 'excellent' || level === 'good') {
      return <Check className="w-6 h-6" />;
    }
    return <X className="w-6 h-6" />;
  };

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-amber-600 text-white">
            Scenario {scenarioNumber} of {totalScenarios}
          </Badge>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-semibold text-gray-700">Empathy Check</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-4xl">{scenario.emoji}</span>
          {scenario.title}
        </CardTitle>
        <CardDescription className="text-base text-gray-700 mt-2">
          <span className="font-semibold text-amber-700">Customer feels:</span> {scenario.customerEmotion}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Situation */}
        <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg">
          <p className="text-gray-800 leading-relaxed">{scenario.situation}</p>
        </div>

        {/* Question */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            How would you respond?
          </p>

          {/* Options */}
          <div className="space-y-3">
            {scenario.options.map((option) => (
              <Button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback}
                className={`w-full text-left p-4 h-auto whitespace-normal justify-start transition-all duration-300 ${
                  selectedOption === option.id
                    ? getEmpathyColor(option.empathyLevel)
                    : 'bg-white hover:bg-amber-50 text-gray-900 border-2 border-gray-200 hover:border-amber-400'
                } ${showFeedback && selectedOption !== option.id ? 'opacity-50' : ''}`}
              >
                <span className="text-base leading-relaxed">{option.text}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && selectedOptionData && (
          <div
            className={`p-4 rounded-lg border-2 animate-in slide-in-from-bottom-4 duration-300 ${
              selectedOptionData.empathyLevel === 'excellent' || selectedOptionData.empathyLevel === 'good'
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-full ${
                  selectedOptionData.empathyLevel === 'excellent' || selectedOptionData.empathyLevel === 'good'
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}
              >
                {getFeedbackIcon(selectedOptionData.empathyLevel)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  {selectedOptionData.empathyLevel === 'excellent'
                    ? '🌟 Excellent Empathy!'
                    : selectedOptionData.empathyLevel === 'good'
                    ? '👍 Good Response!'
                    : selectedOptionData.empathyLevel === 'neutral'
                    ? '😐 Could Be Better'
                    : '❌ Needs Improvement'}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedOptionData.feedback}</p>
                <p className="text-amber-700 font-bold mt-2">+{selectedOptionData.empathyScore} points</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
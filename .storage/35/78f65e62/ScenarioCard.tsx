import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scenario, ScenarioOption } from '@/types/assessment';
import { useState } from 'react';
import { Check, X, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import VisualCueDisplay from './VisualCueDisplay';

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
    }, 3500);
  };

  const getButtonColor = (level: string, score: number) => {
    if (score >= 3) return 'bg-green-500 hover:bg-green-600';
    if (score >= 1) return 'bg-blue-500 hover:bg-blue-600';
    if (score >= -1) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-red-500 hover:bg-red-600';
  };

  const getFeedbackIcon = (score: number) => {
    if (score >= 1) {
      return <Check className="w-6 h-6" />;
    }
    return <X className="w-6 h-6" />;
  };

  const getIndicatorLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      empathy: '💗 Empathy',
      approachability: '😊 Approachability',
      reliability: '🛡️ Reliability',
      warmth: '🔥 Warmth',
    };
    return labels[key] || key;
  };

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-amber-600 text-white">
            Scenario {scenarioNumber} of {totalScenarios}
          </Badge>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-semibold text-gray-700">Read the Visual Cues</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">{scenario.title}</CardTitle>
        <CardDescription className="text-base text-gray-700 mt-2">
          <span className="font-semibold text-amber-700">Primary Focus: {getIndicatorLabel(scenario.primaryIndicator)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Cues Display */}
        <VisualCueDisplay
          cues={scenario.visualCues}
          facialExpression={scenario.facialExpression}
          toneIndicator={scenario.toneIndicator}
          bodyLanguage={scenario.bodyLanguage}
        />

        {/* Situation Context */}
        <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg">
          <p className="text-sm font-semibold text-amber-800 mb-2">📍 Context:</p>
          <p className="text-gray-800 leading-relaxed text-sm">{scenario.situation}</p>
        </div>

        {/* Question */}
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-amber-200">
          <p className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-600" />
            Based on these visual cues, how would you respond?
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
                    ? getButtonColor(option.level, option.score)
                    : 'bg-white hover:bg-amber-50 text-gray-900 border-2 border-gray-200 hover:border-amber-400'
                } ${showFeedback && selectedOption !== option.id ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start gap-2 w-full">
                  {selectedOption === option.id && (
                    <div className="flex-shrink-0 mt-1">
                      {option.score >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-white" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-white" />
                      )}
                    </div>
                  )}
                  <span className="text-base leading-relaxed">{option.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && selectedOptionData && (
          <div
            className={`p-4 rounded-lg border-2 animate-in slide-in-from-bottom-4 duration-300 ${
              selectedOptionData.score >= 1 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-full ${
                  selectedOptionData.score >= 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {getFeedbackIcon(selectedOptionData.score)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  {selectedOptionData.score >= 3
                    ? '🌟 Excellent Response!'
                    : selectedOptionData.score >= 1
                    ? '👍 Good Choice!'
                    : selectedOptionData.score >= -1
                    ? '😐 Could Be Better'
                    : '❌ Poor Response'}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{selectedOptionData.feedback}</p>
                
                {/* Indicator Breakdown */}
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Impact on Indicators:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedOptionData.indicatorScores).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{getIndicatorLabel(key)}:</span>
                        <span
                          className={`font-bold ${
                            value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}
                        >
                          {value > 0 ? '+' : ''}
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-amber-700 font-bold mt-2">
                  Total Score: {selectedOptionData.score > 0 ? '+' : ''}
                  {selectedOptionData.score} points
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
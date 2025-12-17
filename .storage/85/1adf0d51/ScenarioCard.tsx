import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const getButtonColor = (score: number) => {
    if (score >= 3) return 'bg-green-500 hover:bg-green-600 text-white';
    if (score >= 1) return 'bg-blue-500 hover:bg-blue-600 text-white';
    if (score >= -1) return 'bg-yellow-500 hover:bg-yellow-600 text-white';
    return 'bg-red-500 hover:bg-red-600 text-white';
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
    <Card className="border border-neutral-200/50 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-sm">
            Scenario {scenarioNumber} of {totalScenarios}
          </Badge>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-neutral-500" />
            <span className="text-xs font-medium text-neutral-600">Read Visual Cues</span>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-neutral-900 tracking-tight">{scenario.title}</CardTitle>
        <p className="text-sm text-neutral-600 mt-2">
          <span className="font-medium">Focus: {getIndicatorLabel(scenario.primaryIndicator)}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Visual Cues Display */}
        <VisualCueDisplay
          cues={scenario.visualCues}
          facialExpression={scenario.facialExpression}
          toneIndicator={scenario.toneIndicator}
          bodyLanguage={scenario.bodyLanguage}
        />

        {/* Situation Context */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
          <p className="text-xs font-semibold text-amber-700 mb-1.5 uppercase tracking-wide">Context</p>
          <p className="text-neutral-800 leading-relaxed text-sm">{scenario.situation}</p>
        </div>

        {/* Question */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/50">
          <p className="text-base font-medium text-neutral-900 mb-4">How would you respond?</p>

          {/* Options */}
          <div className="space-y-2.5">
            {scenario.options.map((option) => (
              <Button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback}
                variant="outline"
                className={`w-full text-left p-4 h-auto whitespace-normal justify-start transition-all duration-300 ${
                  selectedOption === option.id
                    ? getButtonColor(option.score)
                    : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200 hover:border-neutral-300'
                } ${showFeedback && selectedOption !== option.id ? 'opacity-40' : ''}`}
              >
                <div className="flex items-start gap-3 w-full">
                  {selectedOption === option.id && (
                    <div className="flex-shrink-0 mt-0.5">
                      {option.score >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                    </div>
                  )}
                  <span className="text-sm leading-relaxed">{option.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && selectedOptionData && (
          <div
            className={`p-4 rounded-xl border animate-in slide-in-from-bottom-4 duration-300 ${
              selectedOptionData.score >= 1 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  selectedOptionData.score >= 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {selectedOptionData.score >= 1 ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900 mb-2 text-sm">
                  {selectedOptionData.score >= 3
                    ? '🌟 Excellent Response!'
                    : selectedOptionData.score >= 1
                    ? '👍 Good Choice!'
                    : selectedOptionData.score >= -1
                    ? '😐 Could Be Better'
                    : '❌ Poor Response'}
                </p>
                <p className="text-neutral-700 text-sm leading-relaxed mb-3">{selectedOptionData.feedback}</p>

                {/* Indicator Breakdown */}
                <div className="bg-white p-3 rounded-lg border border-neutral-200/50">
                  <p className="text-xs font-semibold text-neutral-700 mb-2">Impact on Indicators:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedOptionData.indicatorScores).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="text-neutral-600">{getIndicatorLabel(key)}:</span>
                        <span
                          className={`font-bold ${
                            value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-neutral-600'
                          }`}
                        >
                          {value > 0 ? '+' : ''}
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-amber-700 font-semibold mt-2 text-sm">
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
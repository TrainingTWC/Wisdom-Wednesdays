export interface VisualCue {
  type: 'expression' | 'tone' | 'body-language';
  icon: string;
  label: string;
  description: string;
}

export interface IndicatorScore {
  empathy: number;
  approachability: number;
  reliability: number;
  warmth: number;
}

export interface ScenarioOption {
  id: string;
  text: string;
  score: number;
  indicatorScores: IndicatorScore;
  feedback: string;
  level: 'excellent' | 'good' | 'neutral' | 'poor';
}

export interface Scenario {
  id: number;
  title: string;
  situation: string;
  customerEmotion: string;
  emoji: string;
  visualCues: VisualCue[];
  facialExpression: string;
  toneIndicator: string;
  bodyLanguage: string;
  primaryIndicator: keyof IndicatorScore;
  options: ScenarioOption[];
}

export interface AssessmentState {
  currentScenario: number;
  totalScore: number;
  maxScore: number;
  minScore: number;
  indicatorTotals: IndicatorScore;
  answers: {
    scenarioId: number;
    selectedOption: string;
    score: number;
    indicatorScores: IndicatorScore;
  }[];
  isComplete: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  minScore: number;
}
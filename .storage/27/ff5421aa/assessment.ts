export interface VisualCue {
  type: 'expression' | 'tone' | 'body-language';
  icon: string;
  label: string;
  description: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  empathyScore: number;
  feedback: string;
  empathyLevel: 'excellent' | 'good' | 'neutral' | 'poor';
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
  options: ScenarioOption[];
}

export interface AssessmentState {
  currentScenario: number;
  totalScore: number;
  maxScore: number;
  answers: {
    scenarioId: number;
    selectedOption: string;
    score: number;
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
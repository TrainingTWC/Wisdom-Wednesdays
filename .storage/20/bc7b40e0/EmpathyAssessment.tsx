import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ScenarioCard from './ScenarioCard';
import AssessmentResults from './AssessmentResults';
import { Scenario, ScenarioOption, AssessmentState, Badge } from '@/types/assessment';
import { Gamepad2, Heart, Sparkles } from 'lucide-react';

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'The Rushed Morning Customer',
    situation: "It's 7:45 AM. A customer rushes in, clearly stressed, checking their watch constantly. They're fumbling with their wallet and seem anxious about being late for work.",
    customerEmotion: 'Stressed, rushed, anxious',
    emoji: '⏰',
    options: [
      {
        id: 'a',
        text: "Smile warmly and say: 'I can see you're in a hurry! Let me get your order started right away. What's your usual, or would you like a quick recommendation?'",
        empathyScore: 10,
        feedback: 'Perfect! You acknowledged their stress, offered to speed things up, and gave them control. This shows excellent emotional awareness and customer-first thinking.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'Good morning! What can I get for you today?' and wait for their order.",
        empathyScore: 4,
        feedback: "While polite, this misses the opportunity to acknowledge their visible stress. Reading emotional cues helps you provide better service.",
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Tell them: 'Please calm down, we'll get to you when we can. There are other customers too.'",
        empathyScore: 0,
        feedback: 'This response dismisses their feelings and could make them feel worse. Even when busy, acknowledging emotions creates better experiences.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Quickly say: 'Running late? I've got you! I'll make this super fast. What do you need?'",
        empathyScore: 7,
        feedback: 'Good empathy! You recognized their situation and offered help. Adding a warm smile and eye contact would make this excellent.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 2,
    title: 'The Confused First-Timer',
    situation: "A customer walks in looking overwhelmed by the menu board. They're squinting at the options, looking uncertain, and glancing around nervously. They seem hesitant to approach the counter.",
    customerEmotion: 'Overwhelmed, uncertain, shy',
    emoji: '😰',
    options: [
      {
        id: 'a',
        text: "Approach with a friendly smile: 'First time here? Our menu can be a lot! I'd love to help you find something perfect. What kind of flavors do you usually enjoy?'",
        empathyScore: 10,
        feedback: 'Excellent! You made them feel welcome, normalized their confusion, and offered personalized guidance. This creates a comfortable, judgment-free experience.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Wait at the counter and say: 'Ready to order?' when they approach.",
        empathyScore: 3,
        feedback: 'This misses a key opportunity to help someone who clearly needs guidance. Proactive assistance shows empathy and builds confidence.',
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Point to the menu and say: 'Everything's up there. Let me know when you're ready.'",
        empathyScore: 0,
        feedback: 'This feels dismissive to someone already overwhelmed. Great service means meeting customers where they are emotionally.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'Hi! New here? Our most popular drinks are the caramel latte and vanilla cappuccino. Want to try one of those?'",
        empathyScore: 7,
        feedback: 'Good approach! You offered specific suggestions which helps decision-making. Asking about their preferences first would make it even better.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 3,
    title: 'The Regular Having a Bad Day',
    situation: "Your regular customer, who's usually cheerful, comes in with slumped shoulders and a sad expression. They barely make eye contact and their usual greeting is absent.",
    customerEmotion: 'Sad, withdrawn, having a tough day',
    emoji: '😔',
    options: [
      {
        id: 'a',
        text: "Gently say: 'Hey there! I can tell today might be rough. Your usual comfort drink? I'll make it extra special for you today.'",
        empathyScore: 10,
        feedback: 'Perfect empathy! You acknowledged their emotion without prying, offered comfort, and showed you care. This is what builds lasting customer relationships.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Cheerfully say: 'Hey! Great to see you! The usual?'",
        empathyScore: 4,
        feedback: "While maintaining routine is good, matching their energy shows more awareness. Sometimes people need acknowledgment, not forced cheerfulness.",
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Ask: 'What's wrong? Why do you look so sad? Want to talk about it?'",
        empathyScore: 2,
        feedback: 'While well-intentioned, this can feel invasive. Acknowledge their mood without demanding details. Let them share if they want to.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say with a warm smile: 'Your usual today? Hope your day gets better from here!'",
        empathyScore: 7,
        feedback: 'Good balance! You maintained normalcy while offering a kind wish. Adding a small gesture like extra care with their drink would elevate this.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 4,
    title: 'The Customer with Dietary Restrictions',
    situation: "A customer asks about dairy-free options but seems embarrassed. They mention they have a severe allergy and apologize multiple times for 'being difficult.'",
    customerEmotion: 'Embarrassed, apologetic, worried',
    emoji: '🥛',
    options: [
      {
        id: 'a',
        text: "Warmly respond: 'No need to apologize at all! We have great dairy-free options and I'll make sure everything is safe for you. Let me show you what we have!'",
        empathyScore: 10,
        feedback: 'Excellent! You immediately eased their embarrassment, validated their needs, and showed genuine care for their safety. This creates trust and comfort.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'We have oat milk and almond milk. Which do you want?'",
        empathyScore: 4,
        feedback: 'Functional but misses the emotional component. They were apologetic and needed reassurance, not just information.',
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Sigh and say: 'Okay, let me check what we can do. This might take a while.'",
        empathyScore: 0,
        feedback: 'This reinforces their feeling of being a burden. Dietary needs are normal and should be handled with enthusiasm, not reluctance.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'Of course! We have several dairy-free options. Your health and safety are important to us. What sounds good?'",
        empathyScore: 8,
        feedback: 'Great empathy! You normalized their request and emphasized care. Adding more enthusiasm and specific options would make it perfect.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 5,
    title: 'The Impatient Customer During Rush',
    situation: "It's peak hour. A customer who's been waiting 3 minutes starts tapping the counter and sighing loudly. They look frustrated and keep checking their phone.",
    customerEmotion: 'Impatient, frustrated, feeling ignored',
    emoji: '😤',
    options: [
      {
        id: 'a',
        text: "Make eye contact, smile, and say: 'I see you and I appreciate your patience! We're working as fast as we can. I'll have you taken care of in just a moment.'",
        empathyScore: 10,
        feedback: 'Perfect! You acknowledged them (which is what they needed), validated their wait, and gave a timeframe. This diffuses frustration beautifully.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Continue working without acknowledgment until you're ready for their order.",
        empathyScore: 2,
        feedback: 'Ignoring frustrated customers makes things worse. A simple acknowledgment shows respect and can prevent escalation.',
        empathyLevel: 'poor',
      },
      {
        id: 'c',
        text: "Say: 'Sir/Ma'am, we're very busy. You'll have to wait your turn like everyone else.'",
        empathyScore: 0,
        feedback: 'This is defensive and dismissive. Even when customers are impatient, responding with empathy prevents conflict and maintains dignity.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Quickly glance over and say: 'Be right with you!' then continue working.",
        empathyScore: 6,
        feedback: 'Better than ignoring them, but brief. Adding eye contact and acknowledging the wait would show more empathy during stressful times.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 6,
    title: 'The Wrong Order Situation',
    situation: "A customer returns to the counter holding their drink. They politely explain it's not what they ordered. They seem disappointed but are trying to be nice about it.",
    customerEmotion: 'Disappointed, trying to be polite, slightly frustrated',
    emoji: '☕',
    options: [
      {
        id: 'a',
        text: "Immediately respond: 'I'm so sorry about that! Let me remake it correctly right away. What was it supposed to be? And please, keep that one on us.'",
        empathyScore: 10,
        feedback: 'Excellent recovery! You took ownership, acted quickly, and went beyond fixing the mistake. This turns a negative into a positive experience.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'Oh, what did you order?' and remake it without much acknowledgment of the error.",
        empathyScore: 5,
        feedback: 'You fixed the problem but missed the emotional piece. Acknowledging the inconvenience and apologizing shows you value their experience.',
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Ask: 'Are you sure? Let me check the receipt. What exactly is wrong with it?'",
        empathyScore: 1,
        feedback: 'This sounds defensive and doubting. Believe customers and focus on solutions, not blame. Trust builds loyalty.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'My apologies! I'll get that fixed for you right now. Thank you for letting us know.'",
        empathyScore: 7,
        feedback: 'Good response! You apologized and took action. Adding something extra (like offering to let them keep the wrong drink) would elevate this.',
        empathyLevel: 'good',
      },
    ],
  },
];

const badges: Badge[] = [
  {
    id: 'master',
    name: 'Empathy Master',
    description: 'You have exceptional emotional intelligence and create unforgettable customer experiences.',
    emoji: '🏆',
    minScore: 54,
  },
  {
    id: 'expert',
    name: 'Connection Expert',
    description: 'You consistently show strong empathy and build meaningful customer relationships.',
    emoji: '⭐',
    minScore: 45,
  },
  {
    id: 'practitioner',
    name: 'Growing Empath',
    description: 'You understand the importance of empathy and are developing your skills well.',
    emoji: '🌱',
    minScore: 36,
  },
  {
    id: 'learner',
    name: 'Empathy Learner',
    description: 'You are on the path to understanding customer emotions and building connections.',
    emoji: '📚',
    minScore: 0,
  },
];

export default function EmpathyAssessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentScenario: 0,
    totalScore: 0,
    maxScore: scenarios.length * 10,
    answers: [],
    isComplete: false,
  });

  const [hasStarted, setHasStarted] = useState(false);

  const handleAnswer = (option: ScenarioOption) => {
    const newAnswers = [
      ...assessmentState.answers,
      {
        scenarioId: scenarios[assessmentState.currentScenario].id,
        selectedOption: option.id,
        score: option.empathyScore,
      },
    ];

    const newTotalScore = assessmentState.totalScore + option.empathyScore;
    const nextScenario = assessmentState.currentScenario + 1;

    if (nextScenario >= scenarios.length) {
      setAssessmentState({
        ...assessmentState,
        totalScore: newTotalScore,
        answers: newAnswers,
        isComplete: true,
      });
    } else {
      setAssessmentState({
        ...assessmentState,
        currentScenario: nextScenario,
        totalScore: newTotalScore,
        answers: newAnswers,
      });
    }
  };

  const handleRestart = () => {
    setAssessmentState({
      currentScenario: 0,
      totalScore: 0,
      maxScore: scenarios.length * 10,
      answers: [],
      isComplete: false,
    });
    setHasStarted(false);
  };

  const getEarnedBadge = (): Badge => {
    const sortedBadges = [...badges].sort((a, b) => b.minScore - a.minScore);
    return sortedBadges.find((badge) => assessmentState.totalScore >= badge.minScore) || badges[badges.length - 1];
  };

  if (!hasStarted) {
    return (
      <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="text-8xl animate-pulse">🎮</div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Empathy Assessment Game</CardTitle>
          <p className="text-lg text-gray-600">Test Your Customer Connection Skills</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-100 border-l-4 border-amber-600 p-6 rounded-lg">
            <p className="text-gray-800 leading-relaxed text-center text-lg">
              Put yourself in your customers' shoes and discover your empathy superpower! 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Gamepad2 className="w-10 h-10 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 mb-1">6 Scenarios</p>
              <p className="text-sm text-gray-600">Real café situations</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Heart className="w-10 h-10 text-pink-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 mb-1">Empathy Focus</p>
              <p className="text-sm text-gray-600">Feel what they feel</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Sparkles className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900 mb-1">Earn Badges</p>
              <p className="text-sm text-gray-600">Unlock achievements</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-300">
            <p className="font-semibold text-gray-900 mb-3 text-center">🎯 How It Works:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">1.</span>
                <span>Read each customer scenario carefully</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">2.</span>
                <span>Choose the response that shows the most empathy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">3.</span>
                <span>Get instant feedback and learn from each situation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">4.</span>
                <span>Earn your empathy badge based on your total score</span>
              </li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={() => setHasStarted(true)}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-6 text-xl shadow-lg"
            >
              <Gamepad2 className="w-6 h-6 mr-2" />
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (assessmentState.isComplete) {
    return <AssessmentResults totalScore={assessmentState.totalScore} maxScore={assessmentState.maxScore} earnedBadge={getEarnedBadge()} onRestart={handleRestart} />;
  }

  const currentScenario = scenarios[assessmentState.currentScenario];
  const progress = ((assessmentState.currentScenario) / scenarios.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-2 border-amber-300 bg-white shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-gray-900">Assessment Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Score:</span>
              <span className="text-2xl font-bold text-amber-600">{assessmentState.totalScore}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Scenario {assessmentState.currentScenario + 1} of {scenarios.length}
          </p>
        </CardContent>
      </Card>

      {/* Current Scenario */}
      <ScenarioCard
        scenario={currentScenario}
        onAnswer={handleAnswer}
        scenarioNumber={assessmentState.currentScenario + 1}
        totalScenarios={scenarios.length}
      />
    </div>
  );
}
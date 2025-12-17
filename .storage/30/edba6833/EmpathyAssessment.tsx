import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ScenarioCard from './ScenarioCard';
import AssessmentResults from './AssessmentResults';
import { Scenario, ScenarioOption, AssessmentState, Badge } from '@/types/assessment';
import { Eye, Volume2, Hand } from 'lucide-react';

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'The Rushed Morning Customer',
    situation: "It's 7:45 AM. A customer rushes in during the morning rush.",
    customerEmotion: 'Stressed, rushed, anxious',
    emoji: '⏰',
    facialExpression: '😰',
    toneIndicator: 'Fast-paced, breathless, urgent',
    bodyLanguage: 'Checking watch, fumbling with wallet, tapping foot',
    visualCues: [
      {
        type: 'expression',
        icon: '😰',
        label: 'Facial Expression',
        description: 'Furrowed brows, wide eyes, tense jaw',
      },
      {
        type: 'tone',
        icon: '💨',
        label: 'Voice Tone',
        description: 'Speaking quickly, slightly elevated pitch',
      },
      {
        type: 'body-language',
        icon: '⌚',
        label: 'Body Language',
        description: 'Constantly checking watch, shifting weight',
      },
    ],
    options: [
      {
        id: 'a',
        text: "Smile warmly and say: 'I can see you're in a hurry! Let me get your order started right away. What's your usual, or would you like a quick recommendation?'",
        empathyScore: 10,
        feedback: 'Perfect! You read the visual cues (anxious face, fast movements, watch-checking) and responded with urgency and warmth. This shows excellent emotional awareness.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'Good morning! What can I get for you today?' and wait for their order.",
        empathyScore: 4,
        feedback: "You missed the obvious stress signals. The furrowed brows, fast breathing, and watch-checking all indicated urgency. Reading visual cues helps you provide better service.",
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Tell them: 'Please calm down, we'll get to you when we can. There are other customers too.'",
        empathyScore: 0,
        feedback: 'This dismisses their visible stress. The body language (tapping foot, checking watch) showed real anxiety. Acknowledging emotions creates better experiences.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Quickly say: 'Running late? I've got you! I'll make this super fast. What do you need?'",
        empathyScore: 7,
        feedback: 'Good reading of the situation! You noticed the urgency from their movements and expression. Adding a warm smile and eye contact would make this excellent.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 2,
    title: 'The Confused First-Timer',
    situation: "A customer walks in looking at the menu board with uncertainty.",
    customerEmotion: 'Overwhelmed, uncertain, shy',
    emoji: '😰',
    facialExpression: '😕',
    toneIndicator: 'Quiet, hesitant, questioning',
    bodyLanguage: 'Squinting at menu, looking around nervously, staying back from counter',
    visualCues: [
      {
        type: 'expression',
        icon: '😕',
        label: 'Facial Expression',
        description: 'Confused look, squinting eyes, uncertain smile',
      },
      {
        type: 'tone',
        icon: '🤔',
        label: 'Voice Tone',
        description: 'Soft-spoken, lots of "um" and "uh"',
      },
      {
        type: 'body-language',
        icon: '🚶',
        label: 'Body Language',
        description: 'Standing back, hesitant approach, looking around',
      },
    ],
    options: [
      {
        id: 'a',
        text: "Approach with a friendly smile: 'First time here? Our menu can be a lot! I'd love to help you find something perfect. What kind of flavors do you usually enjoy?'",
        empathyScore: 10,
        feedback: 'Excellent! You noticed the confused expression, hesitant body language, and squinting at the menu. You made them feel welcome and offered guidance without judgment.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Wait at the counter and say: 'Ready to order?' when they approach.",
        empathyScore: 3,
        feedback: 'You missed key visual cues: the confused face, nervous glancing around, and hesitant stance all showed they needed help. Proactive assistance shows empathy.',
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Point to the menu and say: 'Everything's up there. Let me know when you're ready.'",
        empathyScore: 0,
        feedback: 'Their squinting, confused expression, and nervous body language clearly showed overwhelm. This response ignores all the visual signals they were sending.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'Hi! New here? Our most popular drinks are the caramel latte and vanilla cappuccino. Want to try one of those?'",
        empathyScore: 7,
        feedback: 'Good observation! You picked up on their uncertainty from their expression and behavior. Asking about preferences first would make it even better.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 3,
    title: 'The Regular Having a Bad Day',
    situation: "Your usually cheerful regular customer comes in looking down.",
    customerEmotion: 'Sad, withdrawn, having a tough day',
    emoji: '😔',
    facialExpression: '😞',
    toneIndicator: 'Quiet, monotone, lacking usual energy',
    bodyLanguage: 'Slumped shoulders, avoiding eye contact, slow movements',
    visualCues: [
      {
        type: 'expression',
        icon: '😞',
        label: 'Facial Expression',
        description: 'Downturned mouth, sad eyes, no smile',
      },
      {
        type: 'tone',
        icon: '🔇',
        label: 'Voice Tone',
        description: 'Flat, quiet, lacking usual enthusiasm',
      },
      {
        type: 'body-language',
        icon: '😔',
        label: 'Body Language',
        description: 'Slumped posture, minimal eye contact, dragging feet',
      },
    ],
    options: [
      {
        id: 'a',
        text: "Gently say: 'Hey there! I can tell today might be rough. Your usual comfort drink? I'll make it extra special for you today.'",
        empathyScore: 10,
        feedback: 'Perfect reading! You noticed the sad expression, slumped shoulders, and lack of eye contact. You acknowledged their mood without prying and offered comfort.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Cheerfully say: 'Hey! Great to see you! The usual?'",
        empathyScore: 4,
        feedback: "The visual cues were clear: downturned mouth, slumped posture, quiet voice. Matching their energy shows more awareness than forced cheerfulness.",
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Ask: 'What's wrong? Why do you look so sad? Want to talk about it?'",
        empathyScore: 2,
        feedback: 'While you noticed the sad facial expression and body language, this approach is too direct. Acknowledge mood without demanding details.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say with a warm smile: 'Your usual today? Hope your day gets better from here!'",
        empathyScore: 7,
        feedback: 'Good! You picked up on their down mood from their expression and posture. A small extra gesture would show even more care.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 4,
    title: 'The Embarrassed Customer',
    situation: "A customer asks about dairy-free options while looking uncomfortable.",
    customerEmotion: 'Embarrassed, apologetic, worried',
    emoji: '😳',
    facialExpression: '😳',
    toneIndicator: 'Apologetic, soft, over-explaining',
    bodyLanguage: 'Fidgeting, avoiding eye contact, apologetic gestures',
    visualCues: [
      {
        type: 'expression',
        icon: '😳',
        label: 'Facial Expression',
        description: 'Blushing, nervous smile, avoiding direct gaze',
      },
      {
        type: 'tone',
        icon: '🙏',
        label: 'Voice Tone',
        description: 'Apologetic, saying "sorry" repeatedly',
      },
      {
        type: 'body-language',
        icon: '🤲',
        label: 'Body Language',
        description: 'Fidgeting with hands, apologetic gestures',
      },
    ],
    options: [
      {
        id: 'a',
        text: "Warmly respond: 'No need to apologize at all! We have great dairy-free options and I'll make sure everything is safe for you. Let me show you what we have!'",
        empathyScore: 10,
        feedback: 'Excellent! You read their embarrassment (blushing, fidgeting, apologetic tone) and immediately put them at ease. This shows great emotional intelligence.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'We have oat milk and almond milk. Which do you want?'",
        empathyScore: 4,
        feedback: 'You missed the emotional cues: the nervous smile, fidgeting hands, and repeated apologies showed they needed reassurance, not just information.',
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Sigh and say: 'Okay, let me check what we can do. This might take a while.'",
        empathyScore: 0,
        feedback: 'Their embarrassed expression, apologetic gestures, and nervous tone showed vulnerability. This response reinforces their feeling of being a burden.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'Of course! We have several dairy-free options. Your health and safety are important to us. What sounds good?'",
        empathyScore: 8,
        feedback: 'Great empathy! You noticed their discomfort from their body language and tone. Adding more enthusiasm would make it perfect.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 5,
    title: 'The Impatient Customer',
    situation: "During peak hour, a customer shows visible frustration while waiting.",
    customerEmotion: 'Impatient, frustrated, feeling ignored',
    emoji: '😤',
    facialExpression: '😤',
    toneIndicator: 'Sharp, clipped, sighing audibly',
    bodyLanguage: 'Tapping counter, checking phone repeatedly, heavy sighs',
    visualCues: [
      {
        type: 'expression',
        icon: '😤',
        label: 'Facial Expression',
        description: 'Frowning, tight lips, impatient look',
      },
      {
        type: 'tone',
        icon: '😮‍💨',
        label: 'Voice Tone',
        description: 'Sighing loudly, sharp when speaking',
      },
      {
        type: 'body-language',
        icon: '👆',
        label: 'Body Language',
        description: 'Tapping fingers, checking phone, crossed arms',
      },
    ],
    options: [
      {
        id: 'a',
        text: "Make eye contact, smile, and say: 'I see you and I appreciate your patience! We're working as fast as we can. I'll have you taken care of in just a moment.'",
        empathyScore: 10,
        feedback: 'Perfect! You noticed the tapping, sighing, and frustrated expression. Eye contact and acknowledgment is exactly what they needed to feel seen.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Continue working without acknowledgment until you're ready for their order.",
        empathyScore: 2,
        feedback: 'The visual cues were obvious: tapping fingers, heavy sighs, checking phone. Ignoring frustrated customers makes things worse.',
        empathyLevel: 'poor',
      },
      {
        id: 'c',
        text: "Say: 'Sir/Ma'am, we're very busy. You'll have to wait your turn like everyone else.'",
        empathyScore: 0,
        feedback: 'Their body language (crossed arms, tapping) and facial expression (frown) showed frustration. This defensive response escalates tension.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Quickly glance over and say: 'Be right with you!' then continue working.",
        empathyScore: 6,
        feedback: 'You noticed their impatience from the tapping and sighs. Adding eye contact and acknowledging the wait would show more empathy.',
        empathyLevel: 'good',
      },
    ],
  },
  {
    id: 6,
    title: 'The Disappointed Customer',
    situation: "A customer returns with their drink, looking disappointed.",
    customerEmotion: 'Disappointed, trying to be polite, slightly frustrated',
    emoji: '😕',
    facialExpression: '😕',
    toneIndicator: 'Polite but disappointed, trying not to complain',
    bodyLanguage: 'Hesitant approach, holding drink uncertainly, small gestures',
    visualCues: [
      {
        type: 'expression',
        icon: '😕',
        label: 'Facial Expression',
        description: 'Disappointed look, forced polite smile',
      },
      {
        type: 'tone',
        icon: '🤐',
        label: 'Voice Tone',
        description: 'Trying to be nice, but sounds let down',
      },
      {
        type: 'body-language',
        icon: '🤷',
        label: 'Body Language',
        description: 'Hesitant steps, uncertain hand gestures',
      },
    ],
    options: [
      {
        id: 'a',
        text: "Immediately respond: 'I'm so sorry about that! Let me remake it correctly right away. What was it supposed to be? And please, keep that one on us.'",
        empathyScore: 10,
        feedback: 'Excellent! You read their disappointment (forced smile, hesitant approach) and took immediate ownership. Going beyond fixing the mistake shows great service.',
        empathyLevel: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'Oh, what did you order?' and remake it without much acknowledgment of the error.",
        empathyScore: 5,
        feedback: 'You missed the emotional cues: the disappointed expression and hesitant body language showed they felt bad about complaining. Acknowledge their feelings.',
        empathyLevel: 'neutral',
      },
      {
        id: 'c',
        text: "Ask: 'Are you sure? Let me check the receipt. What exactly is wrong with it?'",
        empathyScore: 1,
        feedback: 'Their forced polite smile and hesitant approach showed they were already uncomfortable. This defensive response makes them feel doubted.',
        empathyLevel: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'My apologies! I'll get that fixed for you right now. Thank you for letting us know.'",
        empathyScore: 7,
        feedback: 'Good! You noticed their disappointment and responded with care. Adding something extra would turn this negative into a positive experience.',
        empathyLevel: 'good',
      },
    ],
  },
];

const badges: Badge[] = [
  {
    id: 'master',
    name: 'Visual Reading Master',
    description: 'You have exceptional ability to read facial expressions, tone, and body language.',
    emoji: '🏆',
    minScore: 54,
  },
  {
    id: 'expert',
    name: 'Empathy Expert',
    description: 'You consistently interpret visual cues and respond with strong empathy.',
    emoji: '⭐',
    minScore: 45,
  },
  {
    id: 'practitioner',
    name: 'Growing Observer',
    description: 'You understand visual cues and are developing your reading skills well.',
    emoji: '🌱',
    minScore: 36,
  },
  {
    id: 'learner',
    name: 'Visual Learner',
    description: 'You are learning to read customer emotions through visual signals.',
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
            <div className="text-8xl animate-pulse">👁️</div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Visual Empathy Assessment</CardTitle>
          <p className="text-lg text-gray-600">Read Expressions, Tone & Body Language</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-gray-800 leading-relaxed text-center text-lg font-medium">
              Master the art of reading customers through visual cues! 👀
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-blue-200">
              <Eye className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-1 text-lg">Facial Expressions</p>
              <p className="text-sm text-gray-600">Read emotions from faces</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-purple-200">
              <Volume2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-1 text-lg">Tone of Voice</p>
              <p className="text-sm text-gray-600">Understand vocal cues</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-green-200">
              <Hand className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-1 text-lg">Body Language</p>
              <p className="text-sm text-gray-600">Interpret gestures & posture</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-300">
            <p className="font-semibold text-gray-900 mb-3 text-center text-lg">🎯 How It Works:</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-lg">1.</span>
                <span className="leading-relaxed">Observe the customer's <strong>facial expression</strong> (large emoji display)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-lg">2.</span>
                <span className="leading-relaxed">Read their <strong>tone of voice</strong> and <strong>body language</strong> indicators</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-lg">3.</span>
                <span className="leading-relaxed">Study the <strong>visual cue cards</strong> showing what to notice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-lg">4.</span>
                <span className="leading-relaxed">Choose the response that best matches what you observed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-lg">5.</span>
                <span className="leading-relaxed">Get instant feedback on your visual reading skills</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-300">
            <p className="text-center text-gray-700 text-sm">
              <strong>💡 Tip:</strong> Great service starts with observation. Pay attention to what customers show you, not just what they say!
            </p>
          </div>

          <div className="text-center pt-4">
            <Button
              onClick={() => setHasStarted(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl shadow-lg"
            >
              <Eye className="w-6 h-6 mr-2" />
              Start Visual Assessment
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
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Visual Reading Progress</span>
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
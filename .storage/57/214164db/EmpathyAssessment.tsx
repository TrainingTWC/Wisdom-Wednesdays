import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ScenarioCard from './ScenarioCard';
import AssessmentResults from './AssessmentResults';
import IndicatorTracker from './IndicatorTracker';
import { Scenario, ScenarioOption, AssessmentState, Badge } from '@/types/assessment';
import { Eye, Volume2, Hand, Heart, Smile, Shield, Flame } from 'lucide-react';

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
    primaryIndicator: 'empathy',
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
        score: 5,
        indicatorScores: { empathy: 5, approachability: 4, reliability: 3, warmth: 4 },
        feedback: 'Perfect! You read the visual cues (anxious face, fast movements, watch-checking) and responded with urgency and warmth. This shows excellent emotional awareness across all indicators.',
        level: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'Good morning! What can I get for you today?' and wait for their order.",
        score: 0,
        indicatorScores: { empathy: -1, approachability: 1, reliability: 1, warmth: -1 },
        feedback: "You missed the obvious stress signals. The furrowed brows, fast breathing, and watch-checking all indicated urgency. This neutral response lacks empathy and warmth.",
        level: 'neutral',
      },
      {
        id: 'c',
        text: "Tell them: 'Please calm down, we'll get to you when we can. There are other customers too.'",
        score: -5,
        indicatorScores: { empathy: -5, approachability: -4, reliability: -2, warmth: -4 },
        feedback: 'This dismisses their visible stress and damages all indicators. The body language (tapping foot, checking watch) showed real anxiety that you ignored.',
        level: 'poor',
      },
      {
        id: 'd',
        text: "Quickly say: 'Running late? I've got you! I'll make this super fast. What do you need?'",
        score: 3,
        indicatorScores: { empathy: 3, approachability: 3, reliability: 2, warmth: 2 },
        feedback: 'Good reading of the situation! You noticed the urgency from their movements and expression. Adding a warm smile and eye contact would boost warmth and approachability.',
        level: 'good',
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
    primaryIndicator: 'approachability',
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
        score: 5,
        indicatorScores: { empathy: 4, approachability: 5, reliability: 3, warmth: 4 },
        feedback: 'Excellent! You noticed the confused expression, hesitant body language, and squinting at the menu. Your approachability made them feel welcome and offered guidance without judgment.',
        level: 'excellent',
      },
      {
        id: 'b',
        text: "Wait at the counter and say: 'Ready to order?' when they approach.",
        score: -1,
        indicatorScores: { empathy: -2, approachability: -2, reliability: 1, warmth: -1 },
        feedback: 'You missed key visual cues: the confused face, nervous glancing around, and hesitant stance all showed they needed help. Low approachability and empathy here.',
        level: 'neutral',
      },
      {
        id: 'c',
        text: "Point to the menu and say: 'Everything's up there. Let me know when you're ready.'",
        score: -4,
        indicatorScores: { empathy: -4, approachability: -5, reliability: 0, warmth: -3 },
        feedback: 'Their squinting, confused expression, and nervous body language clearly showed overwhelm. This response severely damages approachability and empathy.',
        level: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'Hi! New here? Our most popular drinks are the caramel latte and vanilla cappuccino. Want to try one of those?'",
        score: 2,
        indicatorScores: { empathy: 2, approachability: 3, reliability: 2, warmth: 2 },
        feedback: 'Good observation! You picked up on their uncertainty from their expression and behavior. Asking about preferences first would increase empathy and warmth.',
        level: 'good',
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
    primaryIndicator: 'warmth',
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
        score: 5,
        indicatorScores: { empathy: 5, approachability: 3, reliability: 4, warmth: 5 },
        feedback: 'Perfect reading! You noticed the sad expression, slumped shoulders, and lack of eye contact. You acknowledged their mood without prying and offered comfort with exceptional warmth.',
        level: 'excellent',
      },
      {
        id: 'b',
        text: "Cheerfully say: 'Hey! Great to see you! The usual?'",
        score: 0,
        indicatorScores: { empathy: -2, approachability: 1, reliability: 2, warmth: -1 },
        feedback: "The visual cues were clear: downturned mouth, slumped posture, quiet voice. Matching their energy shows more warmth and empathy than forced cheerfulness.",
        level: 'neutral',
      },
      {
        id: 'c',
        text: "Ask: 'What's wrong? Why do you look so sad? Want to talk about it?'",
        score: -2,
        indicatorScores: { empathy: -1, approachability: -2, reliability: 0, warmth: -3 },
        feedback: 'While you noticed the sad facial expression and body language, this approach is too direct and invasive, damaging warmth and approachability.',
        level: 'poor',
      },
      {
        id: 'd',
        text: "Say with a warm smile: 'Your usual today? Hope your day gets better from here!'",
        score: 3,
        indicatorScores: { empathy: 3, approachability: 2, reliability: 3, warmth: 3 },
        feedback: 'Good! You picked up on their down mood from their expression and posture. A small extra gesture would show even more warmth and care.',
        level: 'good',
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
    primaryIndicator: 'reliability',
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
        score: 5,
        indicatorScores: { empathy: 4, approachability: 4, reliability: 5, warmth: 4 },
        feedback: 'Excellent! You read their embarrassment (blushing, fidgeting, apologetic tone) and immediately put them at ease. Your reliability in handling their needs shows great professionalism.',
        level: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'We have oat milk and almond milk. Which do you want?'",
        score: 0,
        indicatorScores: { empathy: -1, approachability: 0, reliability: 2, warmth: -2 },
        feedback: 'You missed the emotional cues: the nervous smile, fidgeting hands, and repeated apologies showed they needed reassurance, not just information. Low warmth and empathy.',
        level: 'neutral',
      },
      {
        id: 'c',
        text: "Sigh and say: 'Okay, let me check what we can do. This might take a while.'",
        score: -5,
        indicatorScores: { empathy: -4, approachability: -3, reliability: -5, warmth: -4 },
        feedback: 'Their embarrassed expression, apologetic gestures, and nervous tone showed vulnerability. This response severely damages reliability and reinforces their feeling of being a burden.',
        level: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'Of course! We have several dairy-free options. Your health and safety are important to us. What sounds good?'",
        score: 3,
        indicatorScores: { empathy: 3, approachability: 3, reliability: 4, warmth: 2 },
        feedback: 'Great empathy! You noticed their discomfort from their body language and tone. Your reliability shines through. Adding more enthusiasm would boost warmth.',
        level: 'good',
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
    primaryIndicator: 'approachability',
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
        score: 5,
        indicatorScores: { empathy: 4, approachability: 5, reliability: 4, warmth: 3 },
        feedback: 'Perfect! You noticed the tapping, sighing, and frustrated expression. Eye contact and acknowledgment is exactly what they needed to feel seen. Excellent approachability!',
        level: 'excellent',
      },
      {
        id: 'b',
        text: "Continue working without acknowledgment until you're ready for their order.",
        score: -3,
        indicatorScores: { empathy: -3, approachability: -4, reliability: 0, warmth: -2 },
        feedback: 'The visual cues were obvious: tapping fingers, heavy sighs, checking phone. Ignoring frustrated customers severely damages approachability and empathy.',
        level: 'poor',
      },
      {
        id: 'c',
        text: "Say: 'Sir/Ma'am, we're very busy. You'll have to wait your turn like everyone else.'",
        score: -5,
        indicatorScores: { empathy: -5, approachability: -5, reliability: -2, warmth: -4 },
        feedback: 'Their body language (crossed arms, tapping) and facial expression (frown) showed frustration. This defensive response escalates tension and destroys approachability.',
        level: 'poor',
      },
      {
        id: 'd',
        text: "Quickly glance over and say: 'Be right with you!' then continue working.",
        score: 2,
        indicatorScores: { empathy: 1, approachability: 2, reliability: 2, warmth: 1 },
        feedback: 'You noticed their impatience from the tapping and sighs. Adding eye contact and acknowledging the wait would show more approachability and empathy.',
        level: 'good',
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
    primaryIndicator: 'reliability',
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
        score: 5,
        indicatorScores: { empathy: 4, approachability: 4, reliability: 5, warmth: 4 },
        feedback: 'Excellent! You read their disappointment (forced smile, hesitant approach) and took immediate ownership. Going beyond fixing the mistake shows exceptional reliability and service.',
        level: 'excellent',
      },
      {
        id: 'b',
        text: "Say: 'Oh, what did you order?' and remake it without much acknowledgment of the error.",
        score: 0,
        indicatorScores: { empathy: -1, approachability: 0, reliability: 1, warmth: -1 },
        feedback: 'You missed the emotional cues: the disappointed expression and hesitant body language showed they felt bad about complaining. Acknowledge their feelings to improve empathy.',
        level: 'neutral',
      },
      {
        id: 'c',
        text: "Ask: 'Are you sure? Let me check the receipt. What exactly is wrong with it?'",
        score: -4,
        indicatorScores: { empathy: -3, approachability: -3, reliability: -5, warmth: -3 },
        feedback: 'Their forced polite smile and hesitant approach showed they were already uncomfortable. This defensive response severely damages reliability and makes them feel doubted.',
        level: 'poor',
      },
      {
        id: 'd',
        text: "Say: 'My apologies! I'll get that fixed for you right now. Thank you for letting us know.'",
        score: 3,
        indicatorScores: { empathy: 3, approachability: 2, reliability: 4, warmth: 2 },
        feedback: 'Good! You noticed their disappointment and responded with care. Your reliability is strong. Adding something extra would turn this negative into a positive experience.',
        level: 'good',
      },
    ],
  },
];

const badges: Badge[] = [
  {
    id: 'master',
    name: 'Visual Reading Master',
    description: 'You have exceptional ability to read facial expressions, tone, and body language across all indicators.',
    emoji: '🏆',
    minScore: 24,
  },
  {
    id: 'expert',
    name: 'Empathy Expert',
    description: 'You consistently interpret visual cues and respond with strong empathy and balance.',
    emoji: '⭐',
    minScore: 15,
  },
  {
    id: 'practitioner',
    name: 'Growing Observer',
    description: 'You understand visual cues and are developing your reading skills across indicators.',
    emoji: '🌱',
    minScore: 5,
  },
  {
    id: 'learner',
    name: 'Visual Learner',
    description: 'You are learning to read customer emotions through visual signals and indicators.',
    emoji: '📚',
    minScore: -30,
  },
];

export default function EmpathyAssessment() {
  const maxScore = 30;
  const minScore = -30;
  const maxPerIndicator = 30;

  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentScenario: 0,
    totalScore: 0,
    maxScore: maxScore,
    minScore: minScore,
    indicatorTotals: { empathy: 0, approachability: 0, reliability: 0, warmth: 0 },
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
        score: option.score,
        indicatorScores: option.indicatorScores,
      },
    ];

    const newTotalScore = assessmentState.totalScore + option.score;
    const newIndicatorTotals = {
      empathy: assessmentState.indicatorTotals.empathy + option.indicatorScores.empathy,
      approachability: assessmentState.indicatorTotals.approachability + option.indicatorScores.approachability,
      reliability: assessmentState.indicatorTotals.reliability + option.indicatorScores.reliability,
      warmth: assessmentState.indicatorTotals.warmth + option.indicatorScores.warmth,
    };

    const nextScenario = assessmentState.currentScenario + 1;

    if (nextScenario >= scenarios.length) {
      setAssessmentState({
        ...assessmentState,
        totalScore: newTotalScore,
        indicatorTotals: newIndicatorTotals,
        answers: newAnswers,
        isComplete: true,
      });
    } else {
      setAssessmentState({
        ...assessmentState,
        currentScenario: nextScenario,
        totalScore: newTotalScore,
        indicatorTotals: newIndicatorTotals,
        answers: newAnswers,
      });
    }
  };

  const handleRestart = () => {
    setAssessmentState({
      currentScenario: 0,
      totalScore: 0,
      maxScore: maxScore,
      minScore: minScore,
      indicatorTotals: { empathy: 0, approachability: 0, reliability: 0, warmth: 0 },
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
      <Card className="border border-neutral-200/50 bg-white shadow-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="text-[132px]">👁️</div>
          </div>
          <CardTitle className="text-2xl font-semibold text-neutral-900 mb-2 tracking-tight">Visual Empathy Assessment</CardTitle>
          <p className="text-sm text-neutral-600 font-medium">Read Expressions, Tone & Body Language</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-5 rounded-lg">
            <p className="text-neutral-800 leading-relaxed text-center font-medium">
              Master the art of reading customers through visual cues 👀
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-blue-200/50">
              <Eye className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-neutral-900 mb-1">Facial Expressions</p>
              <p className="text-xs text-neutral-600">Read emotions from faces</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-purple-200/50">
              <Volume2 className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <p className="font-semibold text-neutral-900 mb-1">Tone of Voice</p>
              <p className="text-xs text-neutral-600">Understand vocal cues</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-green-200/50">
              <Hand className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-neutral-900 mb-1">Body Language</p>
              <p className="text-xs text-neutral-600">Interpret gestures & posture</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200/50">
            <p className="font-semibold text-neutral-900 mb-4 text-center">📊 4 Performance Indicators</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200/50">
                <Heart className="w-7 h-7 text-pink-600" />
                <div>
                  <p className="font-semibold text-pink-700 text-sm">Empathy</p>
                  <p className="text-xs text-neutral-600">Understanding feelings</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200/50">
                <Smile className="w-7 h-7 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-700 text-sm">Approachability</p>
                  <p className="text-xs text-neutral-600">Being welcoming</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200/50">
                <Shield className="w-7 h-7 text-green-600" />
                <div>
                  <p className="font-semibold text-green-700 text-sm">Reliability</p>
                  <p className="text-xs text-neutral-600">Being dependable</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200/50">
                <Flame className="w-7 h-7 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-700 text-sm">Warmth</p>
                  <p className="text-xs text-neutral-600">Creating connection</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200/50">
            <p className="font-semibold text-neutral-900 mb-3 text-center">🎯 How It Works</p>
            <ul className="space-y-2.5 text-sm text-neutral-700">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">1.</span>
                <span className="leading-relaxed">Observe the customer's <strong>facial expression</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">2.</span>
                <span className="leading-relaxed">Read their <strong>tone of voice</strong> and <strong>body language</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">3.</span>
                <span className="leading-relaxed">Study the <strong>visual cue cards</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">4.</span>
                <span className="leading-relaxed">Choose responses that balance all 4 indicators</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">5.</span>
                <span className="leading-relaxed">Earn <strong>positive or negative points</strong></span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200/50">
            <p className="text-center text-neutral-700 text-xs">
              <strong>💡 Note:</strong> Responses can earn positive points (+1 to +5) or negative points (-1 to -5)
            </p>
          </div>

          <div className="text-center pt-2">
            <Button
              onClick={() => setHasStarted(true)}
              size="lg"
              className="px-10 py-6 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 rounded-xl transition-all duration-300"
            >
              <Eye className="w-5 h-5 mr-2" />
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (assessmentState.isComplete) {
    return (
      <AssessmentResults
        totalScore={assessmentState.totalScore}
        maxScore={maxScore}
        minScore={minScore}
        indicatorScores={assessmentState.indicatorTotals}
        maxPerIndicator={maxPerIndicator}
        earnedBadge={getEarnedBadge()}
        onRestart={handleRestart}
      />
    );
  }

  const currentScenario = scenarios[assessmentState.currentScenario];
  const progress = (assessmentState.currentScenario / scenarios.length) * 100;

  return (
    <div className="space-y-5">
      {/* Progress Header with Indicators */}
      <Card className="border border-neutral-200/50 bg-white shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-neutral-900 text-sm">Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-600">Total Score:</span>
              <span className={`text-xl font-bold ${assessmentState.totalScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {assessmentState.totalScore > 0 ? '+' : ''}
                {assessmentState.totalScore}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-neutral-600 text-center font-medium">
            Scenario {assessmentState.currentScenario + 1} of {scenarios.length}
          </p>

          {/* Live Indicator Tracker */}
          <div className="pt-4 border-t border-neutral-200">
            <p className="text-xs font-semibold text-neutral-700 mb-3 text-center uppercase tracking-wide">Current Performance</p>
            <IndicatorTracker scores={assessmentState.indicatorTotals} compact />
          </div>
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
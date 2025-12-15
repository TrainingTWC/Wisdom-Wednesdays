import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smile, RotateCcw, User, MessageCircle, Meh, Wind, Angry, Music, Volume2, Minus, Zap, Heart, AlertTriangle, X, Frown, Users, BarChart3, Star, ThumbsUp, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export default function MirrorEffectInteractive() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [staffMood, setStaffMood] = useState('professional');
  const [staffTone, setStaffTone] = useState('polite');
  const [customerReaction, setCustomerReaction] = useState('Customer observing your behavior...');
  const [interactionCount, setInteractionCount] = useState(0);

  const staffMoods = {
    friendly: {
      title: 'Friendly & Welcoming',
      description: 'Warm smile, open body language, making eye contact',
      staffIcon: '😊',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    },
    professional: {
      title: 'Professional & Focused',
      description: 'Attentive, composed, business-like demeanor',
      staffIcon: '😐',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700'
    },
    rushed: {
      title: 'Rushed & Hurried',
      description: 'Quick movements, checking time, seems impatient',
      staffIcon: '😰',
      bgColor: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700'
    },
    annoyed: {
      title: 'Annoyed & Frustrated',
      description: 'Frowning, sighing, showing irritation',
      staffIcon: '😤',
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700'
    }
  };

  const voiceTones = {
    warm: {
      title: 'Warm & Enthusiastic',
      description: 'Cheerful tone, varied pitch, engaging',
      icon: '🎵'
    },
    polite: {
      title: 'Polite & Clear',
      description: 'Clear articulation, respectful tone',
      icon: '🗣️'
    },
    monotone: {
      title: 'Flat & Monotone',
      description: 'Little variation, sounds disinterested',
      icon: '😑'
    },
    sharp: {
      title: 'Sharp & Curt',
      description: 'Brief responses, harsh tone',
      icon: '⚡'
    }
  };

  const combinedReactions = {
    'friendly_warm': { 
      mood: 'Customer lights up with genuine joy and feels completely welcomed', 
      customerIcon: '💖',
      impact: 'positive' 
    },
    'friendly_polite': { 
      mood: 'Customer feels respected and appreciated', 
      customerIcon: '😊',
      impact: 'positive' 
    },
    'professional_warm': { 
      mood: 'Customer appreciates the balance of professionalism and warmth', 
      customerIcon: '👍',
      impact: 'positive' 
    },
    'professional_polite': { 
      mood: 'Customer has a smooth, efficient service experience', 
      customerIcon: '✅',
      impact: 'neutral' 
    },
    'rushed_sharp': { 
      mood: 'Customer feels unwelcome and stressed by the hostile service', 
      customerIcon: '⚠️',
      impact: 'negative' 
    },
    'annoyed_sharp': { 
      mood: 'Customer becomes defensive and wants to leave immediately', 
      customerIcon: '❌',
      impact: 'negative' 
    },
    'rushed_monotone': { 
      mood: 'Customer feels like just another number, unimportant', 
      customerIcon: '😞',
      impact: 'negative' 
    },
    'professional_monotone': { 
      mood: 'Customer finds the service cold and impersonal', 
      customerIcon: '😐',
      impact: 'neutral' 
    },
    'annoyed_polite': {
      mood: 'Customer detects the forced politeness and feels uncomfortable',
      customerIcon: '😬',
      impact: 'negative'
    },
    'friendly_monotone': {
      mood: 'Customer is confused by the mixed signals',
      customerIcon: '🤔', 
      impact: 'neutral'
    }
  };

  const currentStaffMood = staffMoods[staffMood as keyof typeof staffMoods];
  const currentVoiceTone = voiceTones[staffTone as keyof typeof voiceTones];

  const handleStaffMoodChange = (mood: string) => {
    setStaffMood(mood);
    updateCustomerReaction(mood, staffTone);
    setInteractionCount(prev => prev + 1);
  };

  const handleVoiceToneChange = (tone: string) => {
    setStaffTone(tone);
    updateCustomerReaction(staffMood, tone);
    setInteractionCount(prev => prev + 1);
  };

  const updateCustomerReaction = (mood: string, tone: string) => {
    const combinedKey = `${mood}_${tone}` as keyof typeof combinedReactions;
    const combined = combinedReactions[combinedKey];
    
    if (combined) {
      setCustomerReaction(combined.mood);
    } else {
      // Fallback reactions
      if (mood === 'friendly') {
        setCustomerReaction('Customer feels welcomed and comfortable 😊');
      } else if (mood === 'annoyed') {
        setCustomerReaction('Customer becomes uncomfortable and defensive 😟');
      } else if (mood === 'rushed') {
        setCustomerReaction('Customer feels pressured and stressed 😰');
      } else {
        setCustomerReaction('Customer has a standard service experience 😐');
      }
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    setShowResults(false);
    updateCustomerReaction(staffMood, staffTone);
  };

  const handleReset = () => {
    setHasStarted(false);
    setShowResults(false);
    setStaffMood('professional');
    setStaffTone('polite');
    setInteractionCount(0);
    setCustomerReaction('Customer observing your behavior...');
  };

  const showSummary = () => {
    setShowResults(true);
  };

  if (!hasStarted) {
    return (
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-blue-200 to-indigo-200 border-blue-300 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] shadow-md">
        <div className="text-center p-4 md:p-6">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4">
            🎭
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-4 px-2">Practice your staff behavior - see how customers react!</p>
          <Button 
            onClick={handleStart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-semibold mx-auto"
          >
            😊 Start Practice!
          </Button>
          <p className="text-xs text-gray-600 mt-2">Choose different staff behaviors and tones</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 border-purple-300 p-6 shadow-lg">
        <div className="text-center relative">
          <div className="text-5xl mb-4">
            📊
          </div>
          <h3 className="text-xl font-bold text-purple-800 mb-4">🎊 Training Complete! 🎊</h3>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="text-yellow-400 absolute top-4 left-4">⭐</div>
            <div className="text-pink-400 absolute top-8 right-8">💫</div>
            <div className="text-green-400 absolute bottom-12 left-8">✨</div>
            <div className="text-blue-400 absolute bottom-8 right-4">🎈</div>
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 mb-4">
            <p className="text-sm text-purple-800 mb-2">
              <strong>Interactions Tried:</strong> {interactionCount}
            </p>
            <p className="text-sm text-purple-700">
              You practiced different staff behaviors and saw how they impact customer reactions in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-700 mb-2">Positive Combinations</h4>
                <p className="text-sm text-green-600 mb-2">Create excellent service:</p>
                <ul className="text-xs text-green-600 list-disc list-inside space-y-1">
                  <li>Friendly + Warm → Delighted customers</li>
                  <li>Professional + Warm → Appreciated service</li>
                  <li>Friendly + Polite → Respected customers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-700 mb-2">Negative Combinations</h4>
                <p className="text-sm text-red-600 mb-2">Create poor service:</p>
                <ul className="text-xs text-red-600 list-disc list-inside space-y-1">
                  <li>Annoyed + Sharp → Hostile environment</li>
                  <li>Rushed + Sharp → Stressed customers</li>
                  <li>Any mood + Monotone → Cold service</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={handleReset}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-breathing"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentReaction = combinedReactions[`${staffMood}_${staffTone}` as keyof typeof combinedReactions];

  return (
    <div className={`relative w-full min-h-[400px] md:min-h-80 rounded-xl overflow-hidden border transition-all duration-500 ${currentStaffMood.bgColor} p-3 md:p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-1">
          👤 Staff Training
        </Badge>
        <div className="flex items-center gap-1">
          <Button
            onClick={showSummary}
            size="sm"
            variant="outline"
            className="px-3 py-1.5 text-xs touch-manipulation"
          >
            Results
          </Button>
          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="px-2 py-1.5 text-xs touch-manipulation"
          >
            🔄
          </Button>
        </div>
      </div>

      {/* Staff Behavior Selection */}
      <div className="space-y-4 mb-6">
        {/* Staff Mood Selection */}
        <div className="bg-white/70 rounded-lg p-3 md:p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">👤</span>
            <p className="text-sm font-medium text-gray-800">Staff Body Language</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {Object.entries(staffMoods).map(([key, mood]) => (
              <Button
                key={key}
                onClick={() => handleStaffMoodChange(key)}
                size="sm"
                className={`${
                  staffMood === key 
                    ? `${mood.bgColor} ${mood.textColor} border-2 shadow-md` 
                    : `bg-white hover:bg-gray-50 text-gray-700 border hover:shadow-md`
                } px-2 py-3 md:px-3 md:py-2 text-xs flex flex-col md:flex-row items-center gap-2 transition-all duration-200 rounded-lg touch-manipulation min-h-[60px] md:min-h-auto`}
              >
                <div className="text-xl md:text-base">{mood.staffIcon}</div>
                <div className="text-center md:text-left">
                  <div className="font-medium text-xs md:text-sm">{mood.title}</div>
                  <div className="text-xs opacity-75 hidden md:block">{mood.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Voice Tone Selection */}
        <div className="bg-white/70 rounded-lg p-3 md:p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <p className="text-sm font-medium text-gray-800">Voice Tone</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {Object.entries(voiceTones).map(([key, tone]) => (
              <Button
                key={key}
                onClick={() => handleVoiceToneChange(key)}
                size="sm"
                className={`${
                  staffTone === key 
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-300 shadow-md' 
                    : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 text-gray-700 border hover:shadow-md'
                } px-2 py-3 md:px-3 md:py-2 text-xs flex flex-col md:flex-row items-center gap-2 transition-all duration-200 rounded-lg touch-manipulation min-h-[60px] md:min-h-auto`}
              >
                <span className="text-xl md:text-lg">{tone.icon}</span>
                <div className="text-center md:text-left">
                  <div className="font-medium text-xs md:text-sm">{tone.title}</div>
                  <div className="text-xs opacity-75 hidden md:block">{tone.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reaction Display */}
      <div className="bg-gradient-to-br from-white/90 to-blue-50/90 rounded-xl p-4 md:p-6 border-2 border-white/60 shadow-lg">
        <div className="text-center">
          <div className="mb-3 flex justify-center relative">
            <div className="relative">
              <div className="text-4xl md:text-6xl">
                {currentReaction?.customerIcon || '😐'}
              </div>
              {currentReaction?.impact === 'positive' && (
                <div className="absolute -top-1 -right-1 text-yellow-400 text-sm md:text-xl">⭐</div>
              )}
              {currentReaction?.impact === 'negative' && (
                <div className="absolute -top-1 -right-1 text-red-400 text-sm md:text-lg">⚠️</div>
              )}
            </div>
          </div>
          <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Customer Response</p>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 px-2">{customerReaction}</p>
          
          <div className="space-y-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            <div className="bg-white/50 rounded-lg p-2">
              <p className="text-xs text-gray-600 mb-1">Your Mood</p>
              <div className="text-xs font-medium text-gray-800 flex items-center justify-center gap-1">
                <span>{currentStaffMood.staffIcon}</span>
                <span className="hidden sm:inline">{currentStaffMood.title}</span>
              </div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <p className="text-xs text-gray-600 mb-1">Your Tone</p>
              <div className="text-xs font-medium text-gray-800 flex items-center justify-center gap-1">
                <span>{currentVoiceTone.icon}</span>
                <span className="hidden sm:inline">{currentVoiceTone.title}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 md:mt-4">
            <p className="text-xs text-gray-600">
              <strong>Interactions:</strong> {interactionCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
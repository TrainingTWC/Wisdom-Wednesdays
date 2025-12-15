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
      staffIcon: Smile,
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    },
    professional: {
      title: 'Professional & Focused',
      description: 'Attentive, composed, business-like demeanor',
      staffIcon: Meh,
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700'
    },
    rushed: {
      title: 'Rushed & Hurried',
      description: 'Quick movements, checking time, seems impatient',
      staffIcon: Wind,
      bgColor: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700'
    },
    annoyed: {
      title: 'Annoyed & Frustrated',
      description: 'Frowning, sighing, showing irritation',
      staffIcon: Angry,
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700'
    }
  };

  const voiceTones = {
    warm: {
      title: 'Warm & Enthusiastic',
      description: 'Cheerful tone, varied pitch, engaging',
      icon: Music
    },
    polite: {
      title: 'Polite & Clear',
      description: 'Clear articulation, respectful tone',
      icon: Volume2
    },
    monotone: {
      title: 'Flat & Monotone',
      description: 'Little variation, sounds disinterested',
      icon: Minus
    },
    sharp: {
      title: 'Sharp & Curt',
      description: 'Brief responses, harsh tone',
      icon: Zap
    }
  };

  const combinedReactions = {
    'friendly_warm': { 
      mood: 'Customer lights up with genuine joy and feels completely welcomed', 
      customerIcon: Heart,
      impact: 'positive' 
    },
    'friendly_polite': { 
      mood: 'Customer feels respected and appreciated', 
      customerIcon: Smile,
      impact: 'positive' 
    },
    'professional_warm': { 
      mood: 'Customer appreciates the balance of professionalism and warmth', 
      customerIcon: ThumbsUp,
      impact: 'positive' 
    },
    'professional_polite': { 
      mood: 'Customer has a smooth, efficient service experience', 
      customerIcon: CheckCircle,
      impact: 'neutral' 
    },
    'rushed_sharp': { 
      mood: 'Customer feels unwelcome and stressed by the hostile service', 
      customerIcon: AlertTriangle,
      impact: 'negative' 
    },
    'annoyed_sharp': { 
      mood: 'Customer becomes defensive and wants to leave immediately', 
      customerIcon: X,
      impact: 'negative' 
    },
    'rushed_monotone': { 
      mood: 'Customer feels like just another number, unimportant', 
      customerIcon: Frown,
      impact: 'negative' 
    },
    'professional_monotone': { 
      mood: 'Customer finds the service cold and impersonal', 
      customerIcon: Minus,
      impact: 'neutral' 
    },
    'annoyed_polite': {
      mood: 'Customer detects the forced politeness and feels uncomfortable',
      customerIcon: AlertCircle,
      impact: 'negative'
    },
    'friendly_monotone': {
      mood: 'Customer is confused by the mixed signals',
      customerIcon: HelpCircle, 
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
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-blue-200 to-indigo-200 border-blue-300 flex items-center justify-center transition-all duration-500 hover:scale-105 shadow-lg animate-pulse">
        <div className="text-center p-4 md:p-6 animate-bounce">
          <div className="relative">
            <Users className="w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 mx-auto text-blue-600 animate-spin" style={{animationDuration: '3s'}} />
            <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 mx-auto bg-blue-400 rounded-full animate-ping opacity-20"></div>
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-4 px-2 animate-fade-in">Practice your staff behavior - see how customers react!</p>
          <Button 
            onClick={handleStart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2 animate-bounce hover:animate-none font-bold"
          >
            <Smile className="w-4 h-4" />
            🎮 Start Game!
          </Button>
          <p className="text-xs text-gray-600 mt-2 animate-pulse">Choose different staff behaviors and tones</p>
        </div>
        <div className="absolute top-2 right-2 animate-spin text-yellow-400">
          ⭐
        </div>
        <div className="absolute bottom-2 left-2 animate-bounce text-pink-400" style={{animationDelay: '0.5s'}}>
          ✨
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 border-purple-300 p-6 shadow-2xl animate-wiggle">
        <div className="text-center relative">
          <div className="relative mb-4">
            <BarChart3 className="w-16 h-16 mx-auto text-purple-600 animate-bounce" />
            <div className="absolute inset-0 w-16 h-16 mx-auto bg-purple-400 rounded-full animate-ping opacity-30"></div>
            <div className="absolute -top-2 -right-2 animate-spin text-yellow-400 text-2xl">🎉</div>
            <div className="absolute -bottom-2 -left-2 animate-bounce text-green-400 text-xl">🌟</div>
          </div>
          <h3 className="text-xl font-bold text-purple-800 mb-4 animate-pulse bg-gradient-to-r from-purple-800 to-pink-800 bg-clip-text text-transparent">🎊 Training Complete! 🎊</h3>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="animate-bounce text-yellow-400 absolute top-4 left-4">⭐</div>
            <div className="animate-bounce text-pink-400 absolute top-8 right-8" style={{animationDelay: '0.3s'}}>💫</div>
            <div className="animate-bounce text-green-400 absolute bottom-12 left-8" style={{animationDelay: '0.6s'}}>✨</div>
            <div className="animate-bounce text-blue-400 absolute bottom-8 right-4" style={{animationDelay: '0.9s'}}>🎈</div>
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
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
    <div className={`relative w-full min-h-80 rounded-xl overflow-hidden border transition-all duration-500 ${currentStaffMood.bgColor} p-4 md:p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <User className="w-3 h-3" />
            Staff Training
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={showSummary}
            size="sm"
            variant="outline"
            className="px-2 py-1 text-xs"
          >
            Results
          </Button>
          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="px-2 py-1 text-xs"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Staff Behavior Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Staff Mood Selection */}
        <div className="bg-white/60 rounded-lg p-4 border border-white/40">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4" />
            <p className="text-sm text-gray-800 font-medium">Staff Body Language</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(staffMoods).map(([key, mood]) => (
              <Button
                key={key}
                onClick={() => handleStaffMoodChange(key)}
                size="sm"
                className={`${
                  staffMood === key 
                    ? `${mood.bgColor} ${mood.textColor} border-2 animate-pulse shadow-lg scale-105` 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border hover:shadow-md hover:scale-102'
                } px-3 py-2 text-xs text-left flex items-center gap-2 transition-all duration-300 transform hover:scale-105 rounded-lg`}
              >
                <mood.staffIcon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{mood.title}</div>
                  <div className="text-xs opacity-75">{mood.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Voice Tone Selection */}
        <div className="bg-white/60 rounded-lg p-4 border border-white/40">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4" />
            <p className="text-sm text-gray-800 font-medium">Voice Tone</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(voiceTones).map(([key, tone]) => (
              <Button
                key={key}
                onClick={() => handleVoiceToneChange(key)}
                size="sm"
                className={`${
                  staffTone === key 
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-300 animate-bounce shadow-lg scale-105' 
                    : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 text-gray-700 border hover:shadow-md hover:scale-102'
                } px-3 py-2 text-xs text-left flex items-center gap-2 transition-all duration-300 transform hover:scale-105 rounded-lg`}
              >
                <tone.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{tone.title}</div>
                  <div className="text-xs opacity-75">{tone.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reaction Display */}
      <div className="bg-gradient-to-br from-white/90 to-blue-50/90 rounded-xl p-6 border-2 border-white/60 shadow-xl animate-fade-in">
        <div className="text-center relative">
          <div className="mb-4 flex justify-center relative">
            <div className="relative">
              {currentReaction?.customerIcon ? 
                <currentReaction.customerIcon className="w-20 h-20 text-gray-600 animate-bounce" /> : 
                <Meh className="w-20 h-20 text-gray-600 animate-bounce" />
              }
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-ping"></div>
              {currentReaction?.impact === 'positive' && (
                <div className="absolute -top-2 -right-2 animate-spin text-yellow-400 text-xl">⭐</div>
              )}
              {currentReaction?.impact === 'negative' && (
                <div className="absolute -top-2 -right-2 animate-bounce text-red-400 text-lg">⚠️</div>
              )}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Customer Response</p>
          <p className="text-sm text-gray-600 mb-4">{customerReaction}</p>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-600 mb-1">Your Mood</p>
              <Badge className={`${currentStaffMood.bgColor} ${currentStaffMood.textColor} text-xs animate-pulse hover:animate-bounce transition-all duration-300 shadow-md`}>
                <currentStaffMood.staffIcon className="w-3 h-3 inline mr-1 animate-spin" style={{animationDuration: '2s'}} /> {currentStaffMood.title}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Your Tone</p>
              <Badge className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs animate-pulse hover:animate-bounce transition-all duration-300 shadow-md">
                <currentVoiceTone.icon className="w-3 h-3 inline mr-1 animate-pulse" /> {currentVoiceTone.title}
              </Badge>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-gray-600">
              <strong>Interactions:</strong> {interactionCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
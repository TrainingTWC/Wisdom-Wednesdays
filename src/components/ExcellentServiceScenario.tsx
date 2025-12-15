import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Star, Smile, Coffee, Users, Gift, ThumbsUp, CheckCircle } from 'lucide-react';

export default function ExcellentServiceScenario() {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerMood, setCustomerMood] = useState('neutral');
  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      id: 'entrance',
      title: 'Customer Enters the Café',
      description: 'Customer walks in and is immediately noticed.',
      customerThought: 'Oh wow, they actually noticed me come in!',
      customerMood: 'pleased',
      baristaAction: 'Looks up, makes eye contact, genuine smile',
      baristaIcon: '😊',
      customerIcon: '🙂',
      connectionLevel: 'Welcomed'
    },
    {
      id: 'greeting',
      title: 'Personal Greeting',
      description: 'Barista gives a warm, personal greeting.',
      customerThought: 'They seem genuinely happy to see me here.',
      customerMood: 'welcomed',
      baristaAction: '"Good morning! How\'s your day starting?"',
      baristaIcon: '👋',
      customerIcon: '😊',
      connectionLevel: 'Personal'
    },
    {
      id: 'ordering',
      title: 'Engaging Order Taking',
      description: 'Barista listens actively and makes recommendations.',
      customerThought: 'They really care about getting this right for me.',
      customerMood: 'valued',
      baristaAction: 'Asks questions, suggests based on weather/mood',
      baristaIcon: '🤔',
      customerIcon: '😌',
      connectionLevel: 'Attentive'
    },
    {
      id: 'conversation',
      title: 'Meaningful Connection',
      description: 'Natural conversation flows while preparing order.',
      customerThought: 'This feels like talking to a friend, not just ordering.',
      customerMood: 'connected',
      baristaAction: 'Remembers previous visit, asks about family',
      baristaIcon: '💭',
      customerIcon: '😄',
      connectionLevel: 'Personal Bond'
    },
    {
      id: 'preparation',
      title: 'Caring Preparation',
      description: 'Barista makes drink with visible care and attention.',
      customerThought: 'I can see they\'re putting thought into this.',
      customerMood: 'appreciated',
      baristaAction: 'Explains what they\'re doing, adds personal touch',
      baristaIcon: '☕',
      customerIcon: '🤗',
      connectionLevel: 'Craft Care'
    },
    {
      id: 'delivery',
      title: 'Thoughtful Delivery',
      description: 'Drink delivered with care and additional touches.',
      customerThought: 'This is so much more than just a coffee transaction.',
      customerMood: 'delighted',
      baristaAction: 'Adds napkin art, wishes well for the day',
      baristaIcon: '🎨',
      customerIcon: '😍',
      connectionLevel: 'Special Touch'
    },
    {
      id: 'farewell',
      title: 'Genuine Farewell',
      description: 'Meaningful goodbye that builds lasting connection.',
      customerThought: 'I can\'t wait to come back here. This is my place now.',
      customerMood: 'loyal',
      baristaAction: '"Hope to see you again soon!" - remembers name',
      baristaIcon: '👋',
      customerIcon: '🥰',
      connectionLevel: 'Community'
    }
  ];

  const moodColors = {
    neutral: 'text-gray-600',
    pleased: 'text-green-500',
    welcomed: 'text-green-600',
    valued: 'text-blue-600',
    connected: 'text-purple-600',
    appreciated: 'text-pink-600',
    delighted: 'text-yellow-600',
    loyal: 'text-green-700'
  };

  const bgColors = {
    neutral: 'bg-gray-50 border-gray-200',
    pleased: 'bg-green-50 border-green-200',
    welcomed: 'bg-green-100 border-green-300',
    valued: 'bg-blue-50 border-blue-200',
    connected: 'bg-purple-50 border-purple-200',
    appreciated: 'bg-pink-50 border-pink-200',
    delighted: 'bg-yellow-50 border-yellow-200',
    loyal: 'bg-green-100 border-green-400'
  };

  const currentStepData = steps[currentStep];

  const handleStart = () => {
    setHasStarted(true);
    setCurrentStep(0);
    setCustomerMood(steps[0].customerMood);
    setShowFeedback(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCustomerMood(steps[nextStep].customerMood);
    } else {
      setShowFeedback(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCustomerMood('neutral');
    setHasStarted(false);
    setShowFeedback(false);
  };

  if (!hasStarted) {
    return (
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-green-200 to-green-400 border-green-300 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] shadow-lg animate-fade-in-scale">
        <div className="text-center p-4 md:p-6">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4 animate-float">✨</div>
          <p className="text-xs md:text-sm text-gray-700 mb-4 px-2 animate-slide-up">Experience service that creates genuine connection</p>
          <Button 
            onClick={handleStart}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-300 animate-stagger-delay-3"
          >
            <span className="animate-pulse">Start Experience</span>
          </Button>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-green-100 to-green-300 border-green-300 p-4 md:p-6 animate-slide-in-up">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-fade-in-scale">🌟</div>
          <h3 className="text-lg font-bold text-green-800 mb-4 animate-pop">Experience Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🥰</div>
                <p className="font-semibold text-green-700">Customer Mood</p>
                <p className="text-sm text-green-600">From neutral to loyal</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">❤️</div>
                <p className="font-semibold text-green-700">Return Likelihood</p>
                <p className="text-sm text-green-600">High - this is "their place"</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">📢</div>
                <p className="font-semibold text-green-700">Word of Mouth</p>
                <p className="text-sm text-green-600">Enthusiastic recommendations</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800 font-medium mb-2">Key Takeaway:</p>
            <p className="text-sm text-green-700">Excellent service transforms transactions into relationships. Connection, not just caffeine, creates loyalty.</p>
          </div>

          <Button 
            onClick={handleRestart}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Experience Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full min-h-64 rounded-xl overflow-hidden border transition-all duration-500 ${bgColors[customerMood as keyof typeof bgColors]} p-4 md:p-6 animate-slide-in-up`}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 animate-fade-in">
        <div 
          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out animate-slide-right"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Step Counter */}
      <div className="flex justify-between items-center mb-4 animate-slide-down">
        <Badge variant="outline" className="text-xs animate-pop">
          Step {currentStep + 1} of {steps.length}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-600 animate-wiggle">
          <Heart className="w-3 h-3 text-red-500 animate-pulse-soft" />
          <span>{currentStepData.connectionLevel}</span>
        </div>
      </div>

      {/* Scene */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Barista Side */}
        <div className="text-center">
          <div className="text-4xl mb-2">{currentStepData.baristaIcon}</div>
          <p className="text-xs font-semibold text-gray-700 mb-1">Barista</p>
          <p className="text-xs text-gray-600">{currentStepData.baristaAction}</p>
        </div>

        {/* Customer Side */}
        <div className="text-center">
          <div className="text-4xl mb-2">{currentStepData.customerIcon}</div>
          <p className="text-xs font-semibold text-gray-700 mb-1">Customer</p>
          <div className="flex items-center justify-center gap-1">
            <Smile className="w-3 h-3 text-green-600" />
            <span className={`text-xs font-semibold ${moodColors[customerMood as keyof typeof moodColors]}`}>
              {customerMood}
            </span>
          </div>
        </div>
      </div>

      {/* Step Title */}
      <h3 className="font-bold text-sm md:text-base text-gray-800 mb-2 text-center">
        {currentStepData.title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-700 mb-3 text-center">
        {currentStepData.description}
      </p>

      {/* Customer Thought Bubble */}
      <div className="bg-white/90 rounded-lg p-3 mb-4 border border-green-300 relative shadow-sm">
        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 italic">"{currentStepData.customerThought}"</p>
        </div>
        <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/90"></div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button 
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {currentStep < steps.length - 1 ? 'Continue Experience' : 'See Impact'}
        </Button>
      </div>
    </div>
  );
}
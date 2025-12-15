import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageCircle, Eye, EyeOff, Smartphone, Smile, Frown, AlertTriangle, X, Coffee, Users, RotateCcw } from 'lucide-react';

export default function BadServiceScenario() {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerMood, setCustomerMood] = useState('neutral');
  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      id: 'entrance',
      title: 'Customer Enters the Café',
      description: 'A customer walks through the door, looking around for service.',
      customerThought: 'Great, I could really use a coffee right now!',
      customerMood: 'optimistic',
      baristaAction: 'Looking at phone, doesn\'t notice customer',
      baristaIcon: Smartphone,
      customerIcon: Smile,
      waitTime: 0
    },
    {
      id: 'waiting',
      title: 'Customer Waits at Counter',
      description: 'Customer approaches the counter and waits to be acknowledged.',
      customerThought: 'Um... hello? I\'d like to order please.',
      customerMood: 'confused',
      baristaAction: 'Still looking at phone, no eye contact',
      baristaIcon: Smartphone,
      customerIcon: AlertTriangle,
      waitTime: 5
    },
    {
      id: 'attempt',
      title: 'Customer Tries to Get Attention',
      description: 'Customer clears throat and tries to make eye contact.',
      customerThought: 'This is awkward... am I invisible?',
      customerMood: 'frustrated',
      baristaAction: 'Glances up briefly, looks annoyed',
      baristaIcon: Frown,
      customerIcon: Frown,
      waitTime: 8
    },
    {
      id: 'ordering',
      title: 'Finally Taking Order',
      description: 'Barista reluctantly puts phone down to take order.',
      customerThought: 'Finally! But they seem really bothered...',
      customerMood: 'uncomfortable',
      baristaAction: 'Sighs, doesn\'t smile, rushes through order',
      baristaIcon: X,
      customerIcon: AlertTriangle,
      waitTime: 12
    },
    {
      id: 'payment',
      title: 'Payment & Receipt',
      description: 'Transaction completed with minimal interaction.',
      customerThought: 'I feel like I\'m bothering them just by being here.',
      customerMood: 'dejected',
      baristaAction: 'No "thank you", already looking back at phone',
      baristaIcon: Smartphone,
      customerIcon: Frown,
      waitTime: 15
    },
    {
      id: 'result',
      title: 'Customer Experience Complete',
      description: 'Customer receives order and leaves feeling unvalued.',
      customerThought: 'I won\'t be coming back here again...',
      customerMood: 'disappointed',
      baristaAction: 'Back to phone, customer forgotten',
      baristaIcon: Smartphone,
      customerIcon: Frown,
      waitTime: 20
    }
  ];

  const moodColors = {
    optimistic: 'text-green-600',
    neutral: 'text-gray-600',
    confused: 'text-yellow-600',
    frustrated: 'text-orange-600',
    uncomfortable: 'text-orange-700',
    dejected: 'text-red-600',
    disappointed: 'text-red-700'
  };

  const bgColors = {
    optimistic: 'bg-green-50 border-green-200',
    neutral: 'bg-gray-50 border-gray-200',
    confused: 'bg-yellow-50 border-yellow-200',
    frustrated: 'bg-orange-50 border-orange-200',
    uncomfortable: 'bg-orange-100 border-orange-300',
    dejected: 'bg-red-50 border-red-200',
    disappointed: 'bg-red-100 border-red-300'
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
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-red-200 to-red-400 border-red-300 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] shadow-lg animate-fade-in-scale">
        <div className="text-center p-4 md:p-6 animate-slide-in-up">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4 animate-float">🎭</div>
          <p className="text-xs md:text-sm text-gray-700 mb-4 px-2 animate-fade-in-delay">Experience what bad service feels like from a customer's perspective</p>
          <Button 
            onClick={handleStart}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-300 animate-wiggle animate-pulse"
          >
            <span className="animate-pulse-soft">Start Experience</span>
          </Button>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-red-100 to-red-300 border-red-300 p-4 md:p-6 animate-slide-in-up">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-fade-in-scale">📊</div>
          <h3 className="text-lg font-bold text-red-800 mb-4 animate-pop">Experience Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-slide-in-left">
            <Card className="bg-red-50 border-red-200 animate-fade-in-scale transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2 animate-shake">😞</div>
                <p className="font-semibold text-red-700 animate-fade-in-delay">Customer Mood</p>
                <p className="text-sm text-red-600 animate-slide-in-up-delay">From excited to disappointed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200 animate-stagger-delay-2 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2 animate-wiggle">❌</div>
                <p className="font-semibold text-red-700 animate-fade-in-delay">Return Likelihood</p>
                <p className="text-sm text-red-600 animate-slide-in-up-delay">Very unlikely</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200 animate-stagger-delay-3 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2 animate-pulse-soft">🗣️</div>
                <p className="font-semibold text-red-700 animate-fade-in-delay">Word of Mouth</p>
                <p className="text-sm text-red-600 animate-slide-in-up-delay">Negative experience shared</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 animate-pop transform hover:scale-105 transition-all duration-300">
            <p className="text-sm text-red-800 font-medium mb-2 animate-fade-in-delay">Key Takeaway:</p>
            <p className="text-sm text-red-700 animate-slide-in-up-delay">Bad service isn't just about what you don't do - it's about making customers feel unseen and unimportant.</p>
          </div>

          <Button 
            onClick={handleRestart}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="animate-pulse-soft">Experience Again</span>
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
          className="bg-red-600 h-2 rounded-full transition-all duration-1000 ease-out animate-slide-right"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Step Counter */}
      <div className="flex justify-between items-center mb-4 animate-slide-down">
        <Badge variant="outline" className="text-xs animate-fade-in-scale">
          Step {currentStep + 1} of {steps.length}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-600 animate-fade-in-delay">
          <Clock className="w-3 h-3" />
          <span>{currentStepData.waitTime}s waiting</span>
        </div>
      </div>

      {/* Scene */}
      <div className="grid grid-cols-2 gap-4 mb-4 animate-slide-in-left">
        {/* Barista Side */}
        <div className="text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-2 flex justify-center animate-fade-in-scale">
            <currentStepData.baristaIcon className="w-12 h-12 text-red-600" />
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-1 animate-slide-up">Barista</p>
          <p className="text-xs text-gray-600 animate-fade-in-delay">{currentStepData.baristaAction}</p>
        </div>

        {/* Customer Side */}
        <div className="text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-2 flex justify-center animate-fade-in-scale">
            <currentStepData.customerIcon className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-1 animate-slide-up">Customer</p>
          <div className="flex items-center justify-center gap-1 animate-fade-in-delay">
            {customerMood === 'optimistic' || customerMood === 'neutral' ? 
              <Eye className="w-3 h-3 text-green-600" /> : 
              <EyeOff className="w-3 h-3 text-red-600" />
            }
            <span className={`text-xs ${moodColors[customerMood as keyof typeof moodColors]}`}>
              {customerMood}
            </span>
          </div>
        </div>
      </div>

      {/* Step Title */}
      <h3 className="font-bold text-sm md:text-base text-gray-800 mb-2 text-center animate-slide-up">
        {currentStepData.title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-700 mb-3 text-center animate-fade-in-delay">
        {currentStepData.description}
      </p>

      {/* Customer Thought Bubble */}
      <div className="bg-white/80 rounded-lg p-3 mb-4 border border-gray-300 relative animate-scale-in transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 italic animate-fade-in-delay">"{currentStepData.customerThought}"</p>
        </div>
        <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/80"></div>
      </div>

      {/* Action Button */}
      <div className="text-center animate-fade-in-scale">
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>
            {currentStep < steps.length - 1 ? 'Continue Experience' : 'See Impact'}
          </span>
        </Button>
      </div>
    </div>
  );
}
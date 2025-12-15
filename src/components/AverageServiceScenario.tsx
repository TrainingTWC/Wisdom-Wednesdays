import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageCircle, Zap, Meh, Coffee, Smile, CheckCircle, Users, AlertCircle, ThumbsUp } from 'lucide-react';

export default function AverageServiceScenario() {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerMood, setCustomerMood] = useState('neutral');
  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      id: 'entrance',
      title: 'Customer Enters the Café',
      description: 'Customer walks in looking for their morning coffee.',
      customerThought: 'Just need my usual coffee and I\'ll be set.',
      customerMood: 'neutral',
      baristaAction: 'Notices customer, nods briefly',
      baristaIcon: Meh,
      customerIcon: Users,
      efficiency: 'Standard'
    },
    {
      id: 'ordering',
      title: 'Order Taken',
      description: 'Barista approaches to take the order professionally.',
      customerThought: 'Okay, they\'re taking my order. Nothing special, but fine.',
      customerMood: 'neutral',
      baristaAction: 'Takes order efficiently, no small talk',
      baristaIcon: CheckCircle,
      customerIcon: Users,
      efficiency: 'Efficient'
    },
    {
      id: 'payment',
      title: 'Payment Processed',
      description: 'Transaction completed smoothly and quickly.',
      customerThought: 'Quick and easy. Gets the job done.',
      customerMood: 'neutral',
      baristaAction: 'Processes payment, says total amount',
      baristaIcon: CheckCircle,
      customerIcon: Users,
      efficiency: 'Quick'
    },
    {
      id: 'preparation',
      title: 'Drink Preparation',
      description: 'Barista makes the drink with standard procedures.',
      customerThought: 'They know what they\'re doing. Professional enough.',
      customerMood: 'neutral',
      baristaAction: 'Makes drink competently, no interaction',
      baristaIcon: Coffee,
      customerIcon: Users,
      efficiency: 'Competent'
    },
    {
      id: 'delivery',
      title: 'Order Ready',
      description: 'Drink is completed and handed to customer.',
      customerThought: 'Got my coffee. It\'s exactly what I ordered.',
      customerMood: 'satisfied',
      baristaAction: 'Hands over drink, says "here you go"',
      baristaIcon: CheckCircle,
      customerIcon: Smile,
      efficiency: 'Complete'
    },
    {
      id: 'result',
      title: 'Transaction Complete',
      description: 'Customer leaves with their order fulfilled.',
      customerThought: 'Job done. Nothing memorable, but nothing wrong either.',
      customerMood: 'neutral',
      baristaAction: 'Moves to next task, transaction forgotten',
      baristaIcon: Users,
      customerIcon: Users,
      efficiency: 'Functional'
    }
  ];

  const moodColors = {
    neutral: 'text-gray-600',
    satisfied: 'text-blue-600'
  };

  const bgColors = {
    neutral: 'bg-amber-50 border-amber-200',
    satisfied: 'bg-blue-50 border-blue-200'
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
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-amber-200 to-amber-400 border-amber-300 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] shadow-lg animate-fade-in-scale">
        <div className="text-center p-4 md:p-6 animate-slide-in-up">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4 animate-float">⚙️</div>
          <p className="text-xs md:text-sm text-gray-700 mb-4 px-2 animate-fade-in-delay">Experience functional but forgettable service</p>
          <Button 
            onClick={handleStart}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-300 animate-wiggle animate-pulse"
          >
            <span className="animate-pulse-soft">Start Experience</span>
          </Button>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-amber-100 to-amber-300 border-amber-300 p-4 md:p-6 animate-slide-in-up">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-fade-in-scale">📊</div>
          <h3 className="text-lg font-bold text-amber-800 mb-4 animate-pop">Experience Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="mb-2 flex justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-amber-700">Customer Mood</p>
                <p className="text-sm text-amber-600">Unchanged - neutral</p>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🔄</div>
                <p className="font-semibold text-amber-700">Return Likelihood</p>
                <p className="text-sm text-amber-600">Maybe - if convenient</p>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🤐</div>
                <p className="font-semibold text-amber-700">Word of Mouth</p>
                <p className="text-sm text-amber-600">Nothing memorable to share</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800 font-medium mb-2">Key Takeaway:</p>
            <p className="text-sm text-amber-700">Average service is functional but forgettable. Like a vending machine - it works, but there's no human connection.</p>
          </div>

          <Button 
            onClick={handleRestart}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg animate-pulse"
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
          className="bg-amber-600 h-2 rounded-full transition-all duration-1000 ease-out animate-slide-right"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Step Counter */}
      <div className="flex justify-between items-center mb-4 animate-slide-down">
        <Badge variant="outline" className="text-xs animate-pop">
          Step {currentStep + 1} of {steps.length}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-600 animate-wiggle">
          <Zap className="w-3 h-3 animate-pulse-soft" />
          <span>{currentStepData.efficiency}</span>
        </div>
      </div>

      {/* Scene */}
      <div className="grid grid-cols-2 gap-4 mb-4 animate-slide-in-left">
        {/* Barista Side */}
        <div className="text-center transform hover:scale-110 transition-transform duration-300">
          <div className="mb-2 flex justify-center animate-fade-in-scale">
            <currentStepData.baristaIcon className="w-12 h-12 text-amber-600 animate-pulse-soft" />
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-1 animate-fade-in-delay">Barista</p>
          <p className="text-xs text-gray-600 animate-slide-in-up-delay">{currentStepData.baristaAction}</p>
        </div>

        {/* Customer Side */}
        <div className="text-center transform hover:scale-110 transition-transform duration-300">
          <div className="mb-2 flex justify-center animate-fade-in-scale">
            <currentStepData.customerIcon className="w-12 h-12 text-blue-600 animate-pulse-soft" />
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-1 animate-fade-in-delay">Customer</p>
          <div className="flex items-center justify-center gap-1 animate-slide-in-up-delay">
            <Meh className="w-3 h-3 text-gray-600 animate-pulse-soft" />
            <span className={`text-xs ${moodColors[customerMood as keyof typeof moodColors]} animate-glow`}>
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
      <div className="bg-white/80 rounded-lg p-3 mb-4 border border-gray-300 relative animate-pop transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5 animate-pulse-soft" />
          <p className="text-xs text-gray-700 italic animate-fade-in-delay">"{currentStepData.customerThought}"</p>
        </div>
        <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/80"></div>
      </div>

      {/* Action Button */}
      <div className="text-center animate-fade-in-scale">
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl transform hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl animate-wiggle-on-hover"
        >
          <span className="animate-pulse-soft">
            {currentStep < steps.length - 1 ? 'Continue Experience' : 'See Impact'}
          </span>
        </Button>
      </div>
    </div>
  );
}
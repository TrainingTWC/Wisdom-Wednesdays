import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight,
  Target,
  Eye,
  RotateCcw,
  Brain,
  Award,
  CheckCircle
} from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  audioText: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface GameTutorialProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function GameTutorial({ onComplete, onClose }: GameTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: "Welcome to Partner Service Training",
      content: "Learn the key behaviors that transform ordinary service into exceptional experiences. This training will help you understand how small actions create big impacts on customer satisfaction.",
      audioText: "Welcome to Partner Service Training! In this interactive experience, you'll learn the key behaviors that transform ordinary service into exceptional experiences. This training will help you understand how small actions create big impacts on customer satisfaction.",
      icon: <Target className="w-8 h-8" />,
      bgColor: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700"
    },
    {
      id: 2,
      title: "Service Quality Scenarios",
      content: "Experience three different service levels: Poor, Average, and Excellent. Each scenario shows real customer interactions and how different approaches affect customer feelings and loyalty.",
      audioText: "First, you'll experience three different service levels: Poor, Average, and Excellent service. Each scenario shows real customer interactions and how different approaches affect customer feelings and loyalty.",
      icon: <Target className="w-8 h-8" />,
      bgColor: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700"
    },
    {
      id: 3,
      title: "Interactive Scenarios",
      content: "Watch realistic service scenarios and identify key behaviors. See how different approaches affect customer satisfaction and learn what makes service truly excellent.",
      audioText: "Watch realistic service scenarios and identify key behaviors. You'll see how different approaches affect customer satisfaction and learn what makes service truly excellent.",
      icon: <Eye className="w-8 h-8" />,
      bgColor: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700"
    },
    {
      id: 4,
      title: "Mirror Activity Practice",
      content: "Practice your partner behaviors with the interactive mirror. Choose body language (Friendly, Professional, Rushed, Annoyed) and voice tones (Warm, Polite, Monotone, Sharp) to see customer reactions.",
      audioText: "Next, practice your partner behaviors with the interactive mirror. Choose different body language like Friendly, Professional, Rushed, or Annoyed. Combine these with voice tones like Warm, Polite, Monotone, or Sharp to see how customers react.",
      icon: <RotateCcw className="w-8 h-8" />,
      bgColor: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-700"
    },
    {
      id: 5,
      title: "Final Assessment",
      content: "Complete the empathy assessment to test your understanding. Apply what you've learned from scenarios and practice to demonstrate your partner service skills.",
      audioText: "Finally, complete the empathy assessment to test your understanding. Apply what you've learned from scenarios and practice to demonstrate your partner service skills.",
      icon: <Brain className="w-8 h-8" />,
      bgColor: "bg-green-50 border-green-200",
      textColor: "text-green-700"
    },
    {
      id: 6,
      title: "Start Your Training Journey",
      content: "You're ready to begin! Use the navigation to move between levels, and remember: excellent service is about genuine care and attention to each customer's needs.",
      audioText: "You're now ready to begin your training journey! Use the navigation to move between levels, and remember: excellent service is about genuine care and attention to each customer's needs. Good luck!",
      icon: <Award className="w-8 h-8" />,
      bgColor: "bg-green-50 border-green-200",
      textColor: "text-green-700"
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSynthesis(window.speechSynthesis);
      
      // Load voices if not already loaded
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // Voices not loaded yet, wait for voiceschanged event
          window.speechSynthesis.addEventListener('voiceschanged', loadVoices, { once: true });
        }
      };
      
      loadVoices();
    }
  }, []);

  const getBestVoice = () => {
    if (!synthesis) return null;
    
    const voices = synthesis.getVoices();
    
    // Priority list for natural-sounding voices
    const preferredVoices = [
      // Modern neural voices (Windows 11)
      'Microsoft Aria Online (Natural) - English (United States)',
      'Microsoft Jenny Online (Natural) - English (United States)', 
      'Microsoft Guy Online (Natural) - English (United States)',
      
      // High-quality system voices
      'Microsoft Zira - English (United States)',
      'Microsoft David - English (United States)',
      'Google US English',
      'Samantha',
      'Alex',
      'Karen',
      'Daniel',
      'Moira',
      
      // Fallback to any English voice
      ...voices.filter(voice => voice.lang.startsWith('en')).map(v => v.name)
    ];
    
    // Find the first available preferred voice
    for (const preferredName of preferredVoices) {
      const voice = voices.find(v => v.name === preferredName);
      if (voice) return voice;
    }
    
    // Fallback to first English voice or default
    return voices.find(voice => voice.lang.startsWith('en')) || voices[0] || null;
  };

  const playAudio = (text: string) => {
    if (!synthesis || !audioEnabled) return;

    // Stop any currently playing audio
    synthesis.cancel();

    // Add natural pauses and formatting for better speech
    const formattedText = text
      .replace(/\./g, '. ')  // Add pause after periods
      .replace(/,/g, ', ')   // Add pause after commas
      .replace(/:/g, ': ')   // Add pause after colons
      .replace(/\?/g, '? ')  // Add pause after questions
      .replace(/!/g, '! ')   // Add pause after exclamations
      .replace(/\s+/g, ' ')  // Clean up multiple spaces
      .trim();

    const utterance = new SpeechSynthesisUtterance(formattedText);
    
    // Get the best available voice
    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    // Optimized settings for natural speech
    utterance.rate = 0.85;     // Slightly slower for clarity
    utterance.pitch = 0.95;    // Slightly lower pitch for warmth
    utterance.volume = 0.9;    // Good volume level

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentUtterance(utterance);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
    };

    synthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsPlaying(false);
      setCurrentUtterance(null);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    }
    setAudioEnabled(!audioEnabled);
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (audioEnabled) {
        // Small delay to let the UI update before starting audio
        setTimeout(() => {
          playAudio(tutorialSteps[currentStep + 1].audioText);
        }, 200);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (audioEnabled) {
        setTimeout(() => {
          playAudio(tutorialSteps[currentStep - 1].audioText);
        }, 200);
      }
    }
  };

  const handleClose = () => {
    stopAudio();
    onClose();
  };

  const handleComplete = () => {
    stopAudio();
    onComplete();
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    if (audioEnabled) {
      setTimeout(() => {
        playAudio(tutorialSteps[stepIndex].audioText);
      }, 200);
    }
  };

  // Auto-play audio when tutorial starts or step changes
  useEffect(() => {
    if (audioEnabled && currentStep === 0) {
      // Auto-play the first step after a brief delay
      setTimeout(() => {
        playAudio(tutorialSteps[currentStep].audioText);
      }, 500);
    }
  }, [audioEnabled]);

  const currentStepData = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white/70">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-800">Partner Training Tutorial</h2>
                {audioEnabled && (
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    Natural voice narration
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Step {currentStep + 1} of {tutorialSteps.length}
              </Badge>
              <Button
                onClick={handleClose}
                size="sm"
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-2 bg-white/50">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Step Content */}
            <div className={`rounded-xl p-6 border-2 ${currentStepData.bgColor} transition-all duration-300`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${currentStepData.textColor.replace('text-', 'bg-').replace('-700', '-100')} border-2 ${currentStepData.textColor.replace('text-', 'border-').replace('-700', '-300')}`}>
                  {currentStepData.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${currentStepData.textColor} mb-3`}>
                    {currentStepData.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentStepData.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={toggleAudio}
                variant="outline"
                size="sm"
                className={`${audioEnabled ? 'text-green-600 border-green-300' : 'text-gray-400 border-gray-300'}`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                {audioEnabled ? 'Audio On' : 'Audio Off'}
              </Button>
              
              {audioEnabled && (
                <Button
                  onClick={() => isPlaying ? stopAudio() : playAudio(currentStepData.audioText)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="border-t bg-gray-50/80 p-4">
            {/* Step Indicators */}
            <div className="flex justify-center mb-4">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-200 ${
                    index === currentStep
                      ? 'bg-blue-600 scale-125'
                      : index < currentStep
                      ? 'bg-green-500 hover:scale-110'
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="text-center">
                {currentStep === tutorialSteps.length - 1 ? (
                  <Button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 shadow-lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-lg"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>

              <div className="w-[90px]"> {/* Spacer for alignment */}
                <p className="text-xs text-gray-500 text-center">
                  💡 Tip: Use audio playback to learn while multitasking. This tutorial takes about 2-3 minutes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
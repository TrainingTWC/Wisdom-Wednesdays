import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BadServiceScenario from '@/components/BadServiceScenario';
import AverageServiceScenario from '@/components/AverageServiceScenario';
import ExcellentServiceScenario from '@/components/ExcellentServiceScenario';
import MirrorEffectInteractive from '@/components/MirrorEffectInteractiveSimple';
import EmpathyAssessment from '@/components/EmpathyAssessment';
import GameTutorial from '@/components/GameTutorial';
import { ArrowRight, ArrowLeft, Trophy, Star, Play, CheckCircle, HelpCircle } from 'lucide-react';

export default function Index() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  const levels = [
    { 
      id: 'intro', 
      title: 'Welcome to The Game', 
      icon: '👋', 
      color: 'from-purple-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-purple-100 to-blue-100',
      points: 0,
      type: 'intro'
    },
    { 
      id: 'bad', 
      title: 'Level 1: Bad Service', 
      icon: '😞', 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-100 to-red-200',
      points: 100,
      type: 'scenario'
    },
    { 
      id: 'average', 
      title: 'Level 2: Average Service', 
      icon: '😐', 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      points: 200,
      type: 'scenario'
    },
    { 
      id: 'excellent', 
      title: 'Level 3: Excellent Service', 
      icon: '😊', 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      points: 300,
      type: 'scenario'
    },
    { 
      id: 'reflection', 
      title: 'Mirror Challenge', 
      icon: '🪞', 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
      points: 400,
      type: 'interactive'
    },
    { 
      id: 'assessment', 
      title: 'Final Assessment', 
      icon: '🎯', 
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-purple-100',
      points: 500,
      type: 'assessment'
    }
  ];

  const currentLevelData = levels[currentLevel];
  const progress = ((currentLevel + 1) / levels.length) * 100;

  const handleNextLevel = () => {
    if (!completedLevels.includes(currentLevel)) {
      setCompletedLevels([...completedLevels, currentLevel]);
      setTotalScore(prev => prev + currentLevelData.points);
    }
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handlePrevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const handleLevelSelect = (index: number) => {
    setCurrentLevel(index);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    setShowWelcome(false);
    // Save tutorial completion status
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  // Load tutorial status on component mount
  useEffect(() => {
    const tutorialSeen = localStorage.getItem('hasSeenTutorial');
    if (tutorialSeen === 'true') {
      setHasSeenTutorial(true);
    }
  }, []);

  const getActiveColorClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'data-[state=active]:bg-red-600 data-[state=active]:border-red-600';
      case 'amber':
        return 'data-[state=active]:bg-amber-600 data-[state=active]:border-amber-600';
      case 'green':
        return 'data-[state=active]:bg-green-600 data-[state=active]:border-green-600';
      case 'purple':
        return 'data-[state=active]:bg-purple-600 data-[state=active]:border-purple-600';
      case 'gradient':
        return 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:border-pink-600';
      default:
        return 'data-[state=active]:bg-amber-600 data-[state=active]:border-amber-600';
    }
  };

  // Welcome screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden animate-scale-in">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-6xl animate-float mb-4">🎮</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                The Cafe way
              </h1>
              <div className="text-xl font-semibold text-gray-800">Service Training Game</div>
              <p className="text-gray-600 leading-relaxed">
                Master the art of excellent customer service through interactive levels and challenges!
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    if (!hasSeenTutorial) {
                      setShowTutorial(true);
                    } else {
                      setShowWelcome(false);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-breathing"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {hasSeenTutorial ? 'Start Game' : 'Start with Tutorial'}
                </Button>
                
                {hasSeenTutorial && (
                  <Button 
                    onClick={() => setShowTutorial(true)}
                    variant="outline"
                    className="w-full border-purple-300 text-purple-200 hover:bg-purple-800/30 py-3 rounded-xl"
                  >
                    <HelpCircle className="mr-2 w-4 h-4" />
                    Show Tutorial Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Mobile-First Game Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">
              🎮
            </div>
            <div>
              <h1 className="text-lg font-bold">The Cafe way</h1>
              <div className="text-xs text-gray-400">Level {currentLevel + 1} of {levels.length}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-500/20 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold">{totalScore}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-sm">{completedLevels.length}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </header>

      {/* Mobile Game Content */}
      <main className="flex-1 overflow-hidden pb-24">
        {/* Current Level Card */}
        <div className="p-4 pb-8">
          <Card className={`${currentLevelData.bgColor} border-0 shadow-lg rounded-3xl overflow-hidden transform transition-all duration-500`}>
            <CardContent className="p-6">
              {/* Level Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentLevelData.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                    {currentLevelData.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{currentLevelData.title}</h2>
                    <div className="text-sm text-gray-600">
                      {completedLevels.includes(currentLevel) && <CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />}
                      {currentLevelData.points > 0 && `${currentLevelData.points} points`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Content */}
              <div className="min-h-[60vh] flex items-center justify-center">
                {currentLevelData.type === 'intro' && (
                  <div className="text-center space-y-6">
                    <div className="text-8xl animate-float">☕</div>
                    <h3 className="text-2xl font-bold text-gray-900">Welcome to Service Training!</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Learn the difference between bad, average, and excellent service through interactive scenarios.
                    </p>
                    <div className="bg-white/70 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-gray-800 font-semibold">Ready to become a service expert?</p>
                    </div>
                  </div>
                )}

                {currentLevelData.type === 'scenario' && currentLevelData.id === 'bad' && (
                  <div className="w-full">
                    <BadServiceScenario />
                  </div>
                )}

                {currentLevelData.type === 'scenario' && currentLevelData.id === 'average' && (
                  <div className="w-full">
                    <AverageServiceScenario />
                  </div>
                )}

                {currentLevelData.type === 'scenario' && currentLevelData.id === 'excellent' && (
                  <div className="w-full">
                    <ExcellentServiceScenario />
                  </div>
                )}

                {currentLevelData.type === 'interactive' && (
                  <div className="w-full">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Mirror Challenge</h3>
                      <p className="text-gray-700">Practice your service attitude</p>
                    </div>
                    <MirrorEffectInteractive />
                  </div>
                )}

                {currentLevelData.type === 'assessment' && (
                  <div className="w-full">
                    <EmpathyAssessment />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-2xl border-t border-white/20 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevLevel}
              disabled={currentLevel === 0}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 animate-breathing"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {/* Level Dots */}
            <div className="flex items-center gap-2">
              {levels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleLevelSelect(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 animate-breathing ${
                    index === currentLevel
                      ? 'bg-white scale-125'
                      : completedLevels.includes(index)
                      ? 'bg-green-400'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextLevel}
              disabled={currentLevel === levels.length - 1}
              className={`bg-gradient-to-r ${currentLevelData.color} text-white hover:scale-105 disabled:opacity-30 transition-all duration-300 animate-breathing`}
            >
              {currentLevel === levels.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* Tutorial Modal */}
      {showTutorial && (
        <GameTutorial
          onComplete={handleTutorialComplete}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </div>
  );
}
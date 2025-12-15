import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ServiceSection from '@/components/ServiceSection';
import BadServiceScenario from '@/components/BadServiceScenario';
import AverageServiceScenario from '@/components/AverageServiceScenario';
import ExcellentServiceScenario from '@/components/ExcellentServiceScenario';
import MirrorEffectInteractive from '@/components/MirrorEffectInteractiveSimple';
import EmpathyAssessment from '@/components/EmpathyAssessment';
import { Coffee, ArrowRight } from 'lucide-react';

export default function Index() {
  const [currentTab, setCurrentTab] = useState('intro');
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Scroll to top whenever the tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const sections = [
    { id: 'intro', emoji: '👋', label: 'Welcome', color: 'amber' },
    { id: 'bad', emoji: '🔴', label: 'Bad Service', color: 'red' },
    { id: 'average', emoji: '🟡', label: 'Average Service', color: 'amber' },
    { id: 'excellent', emoji: '🟢', label: 'Excellent Service', color: 'green' },
    { id: 'reflection', emoji: '💭', label: 'Reflection', color: 'purple' },
    { id: 'assessment', emoji: '📝', label: 'Assessment', color: 'gradient' }
  ];

  const currentIndex = sections.findIndex(s => s.id === currentTab);

  const handleNext = () => {
    if (!completedSections.includes(currentTab)) {
      setCompletedSections([...completedSections, currentTab]);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < sections.length) {
      setCurrentTab(sections[nextIndex].id);
    }
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (!completedSections.includes(currentTab)) {
      setCompletedSections([...completedSections, currentTab]);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
      {/* Animated Background Blobs - Apple Style */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-neutral-200/50 shadow-sm transition-all duration-500">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
              <Coffee className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 bg-clip-text text-transparent">
              Café Service Training
            </h1>
          </div>
          <p className="text-center text-neutral-600 text-sm md:text-lg font-medium">Section 1: What Great Service Looks Like</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-12 relative z-10">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          {/* Redesigned Pill-Shaped Navigation with One UI 8 Aesthetics */}
          <div className="mb-8 md:mb-12">
            <TabsList className="w-full flex flex-row items-center justify-between gap-2 md:gap-3 bg-transparent h-auto p-0">
              {/* Landing Page - Welcome Pill */}
              <div className="flex flex-col items-center gap-1 group flex-shrink-0">
                <TabsTrigger
                  key="intro"
                  value="intro"
                  aria-label="Welcome"
                  title="Welcome"
                  className={`
                    rounded-full px-3 py-2 min-h-[48px] min-w-[48px]
                    text-xl
                    border border-white/30
                    backdrop-blur-2xl bg-white/20
                    hover:bg-white/30 hover:border-white/40
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500/90 data-[state=active]:to-orange-600/90
                    data-[state=active]:text-white data-[state=active]:border-amber-400/30
                    data-[state=active]:shadow-xl data-[state=active]:shadow-amber-500/30 data-[state=active]:scale-105
                    shadow-md hover:shadow-lg
                    transition-all duration-700 ease-out
                    font-semibold
                    ${completedSections.includes('intro') && currentTab !== 'intro' ? 'opacity-60 bg-neutral-500/20 backdrop-blur-2xl' : ''}
                  `}
                >
                  <span className="block relative transform transition-transform duration-500 group-hover:scale-110" role="img" aria-label="Welcome">
                    {completedSections.includes('intro') && currentTab !== 'intro' ? '✓' : '👋'}
                  </span>
                </TabsTrigger>
                <span className="text-[10px] font-medium text-neutral-700 text-center transition-all duration-300 group-hover:text-amber-700 whitespace-nowrap hidden md:block">Welcome</span>
              </div>

              {/* Bad Service - Red */}
              <div className="flex flex-col items-center gap-1 group flex-shrink-0">
                <TabsTrigger
                  key="bad"
                  value="bad"
                  aria-label="Bad Service"
                  title="Bad Service"
                  className={`
                    rounded-full px-2 py-2 min-h-[44px] min-w-[44px]
                    text-xl
                    border border-white/30
                    backdrop-blur-2xl bg-white/20 hover:bg-white/30
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500/90 data-[state=active]:to-red-600/90
                    data-[state=active]:text-white data-[state=active]:border-red-400/30
                    data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/30
                    transition-all duration-700 ease-out
                    transform hover:scale-110
                    ${completedSections.includes('bad') && currentTab !== 'bad' ? 'opacity-60 bg-neutral-500/20' : ''}
                  `}
                >
                  <span className="block" role="img" aria-label="Bad Service">
                    {completedSections.includes('bad') && currentTab !== 'bad' ? '✓' : '🔴'}
                  </span>
                </TabsTrigger>
                <span className="text-[10px] font-medium text-neutral-700 text-center transition-all duration-300 group-hover:text-red-700 whitespace-nowrap hidden md:block">Bad</span>
              </div>

              {/* Average Service - Yellow */}
              <div className="flex flex-col items-center gap-1 group flex-shrink-0">
                <TabsTrigger
                  key="average"
                  value="average"
                  aria-label="Average Service"
                  title="Average Service"
                  className={`
                    rounded-full px-2 py-2 min-h-[44px] min-w-[44px]
                    text-xl
                    border border-white/30
                    backdrop-blur-2xl bg-white/20 hover:bg-white/30
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-400/90 data-[state=active]:to-yellow-500/90
                    data-[state=active]:text-white data-[state=active]:border-yellow-400/30
                    data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/30
                    transition-all duration-700 ease-out
                    transform hover:scale-110
                    ${completedSections.includes('average') && currentTab !== 'average' ? 'opacity-60 bg-neutral-500/20' : ''}
                  `}
                >
                  <span className="block" role="img" aria-label="Average Service">
                    {completedSections.includes('average') && currentTab !== 'average' ? '✓' : '🟡'}
                  </span>
                </TabsTrigger>
                <span className="text-[10px] font-medium text-neutral-700 text-center transition-all duration-300 group-hover:text-yellow-700 whitespace-nowrap hidden md:block">Average</span>
              </div>

              {/* Excellent Service - Green */}
              <div className="flex flex-col items-center gap-1 group flex-shrink-0">
                <TabsTrigger
                  key="excellent"
                  value="excellent"
                  aria-label="Excellent Service"
                  title="Excellent Service"
                  className={`
                    rounded-full px-2 py-2 min-h-[44px] min-w-[44px]
                    text-xl
                    border border-white/30
                    backdrop-blur-2xl bg-white/20 hover:bg-white/30
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500/90 data-[state=active]:to-green-600/90
                    data-[state=active]:text-white data-[state=active]:border-green-400/30
                    data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/30
                    transition-all duration-700 ease-out
                    transform hover:scale-110
                    ${completedSections.includes('excellent') && currentTab !== 'excellent' ? 'opacity-60 bg-neutral-500/20' : ''}
                  `}
                >
                  <span className="block" role="img" aria-label="Excellent Service">
                    {completedSections.includes('excellent') && currentTab !== 'excellent' ? '✓' : '🟢'}
                  </span>
                </TabsTrigger>
                <span className="text-[10px] font-medium text-neutral-700 text-center transition-all duration-300 group-hover:text-green-700 whitespace-nowrap hidden md:block">Excellent</span>
              </div>

              {/* Reflection - Mirror-themed with unique styling */}
              <div className="flex flex-col items-center gap-1 group flex-shrink-0">
                <TabsTrigger
                  key="reflection"
                  value="reflection"
                  aria-label="Reflection"
                  title="Reflection"
                  className={`
                    rounded-full px-3 py-2 min-h-[48px] min-w-[48px]
                    text-xl
                    border border-white/30
                    backdrop-blur-2xl bg-white/20
                    hover:bg-white/30 hover:border-white/40
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500/90 data-[state=active]:via-purple-600/90 data-[state=active]:to-pink-600/90
                    data-[state=active]:text-white data-[state=active]:border-purple-400/30
                    data-[state=active]:shadow-xl data-[state=active]:shadow-purple-500/30
                    shadow-md hover:shadow-lg
                    transition-all duration-700 ease-out
                    transform hover:scale-105
                    ${completedSections.includes('reflection') && currentTab !== 'reflection' ? 'opacity-60 bg-neutral-500/20 backdrop-blur-2xl' : ''}
                  `}
                >
                  <span className="block transform transition-transform duration-500 group-hover:scale-110" role="img" aria-label="Reflection">
                    {completedSections.includes('reflection') && currentTab !== 'reflection' ? '✓' : '🪞'}
                  </span>
                </TabsTrigger>
                <span className="text-[10px] font-medium text-neutral-700 text-center transition-all duration-300 group-hover:text-purple-700 whitespace-nowrap hidden md:block">Mirror</span>
              </div>

              {/* Assessment - Prominent graduation/certificate style */}
              <div className="flex flex-col items-center gap-1 group flex-shrink-0">
                <TabsTrigger
                  key="assessment"
                  value="assessment"
                  aria-label="Assessment"
                  title="Assessment"
                  className={`
                    rounded-full px-3 py-2 min-h-[48px] min-w-[48px]
                    text-xl
                    border border-white/30
                    backdrop-blur-2xl bg-white/20
                    hover:bg-white/30 hover:border-white/40
                    data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500/90 data-[state=active]:via-purple-600/90 data-[state=active]:to-pink-600/90
                    data-[state=active]:text-white data-[state=active]:border-pink-400/30
                    data-[state=active]:shadow-xl data-[state=active]:shadow-pink-500/30 data-[state=active]:scale-105
                    shadow-md hover:shadow-lg
                    transition-all duration-700 ease-out
                    ring-1 ring-white/20 data-[state=active]:ring-pink-400/30
                    ${completedSections.includes('assessment') && currentTab !== 'assessment' ? 'opacity-60 bg-neutral-500/20 backdrop-blur-2xl' : ''}
                  `}
                >
                  <span className="block transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" role="img" aria-label="Assessment">
                    {completedSections.includes('assessment') && currentTab !== 'assessment' ? '✓' : '📝'}
                  </span>
                </TabsTrigger>
                <span className="text-[10px] font-medium text-neutral-700 text-center transition-all duration-300 group-hover:text-pink-700 whitespace-nowrap hidden md:block">Test</span>
              </div>
            </TabsList>
          </div>

          {/* Introduction */}
          <TabsContent value="intro" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="border border-white/30 backdrop-blur-2xl bg-white/30 shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] hover:bg-white/40">
              <CardHeader className="text-center pb-4 px-4 md:px-8 pt-8 md:pt-10">
                <CardTitle className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent mb-4">
                  Welcome to Customer Service Excellence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 md:space-y-8 px-4 md:px-8 pb-8 md:pb-10">
                <div className="flex justify-center mb-6 md:mb-8">
                  <div className="text-7xl md:text-9xl animate-bounce-slow transform transition-transform duration-1000 hover:scale-110 hover:rotate-12">☕</div>
                </div>
                <div className="backdrop-blur-xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 border border-white/30 p-5 md:p-7 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-amber-400/30 hover:to-orange-400/30">
                  <p className="text-lg md:text-2xl text-neutral-900 leading-relaxed font-semibold text-center">
                    Every café moment falls somewhere between bad, average, and excellent.
                  </p>
                </div>
                <div className="backdrop-blur-xl bg-white/40 p-5 md:p-7 rounded-2xl shadow-lg border border-white/30 transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/50">
                  <p className="text-base md:text-xl text-neutral-800 leading-relaxed text-center">
                    The secret is learning how to move from <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">"just doing the job"</span> to <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">creating connection</span>.
                  </p>
                </div>
                <div className="text-center pt-4">
                  <p className="text-sm md:text-base text-neutral-700 mb-6 font-medium">Ready to learn what makes service truly exceptional?</p>
                  <Button 
                    onClick={handleNext}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-2xl shadow-xl shadow-amber-500/30 transition-all duration-700 min-h-[44px] w-full sm:w-auto transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 font-semibold backdrop-blur-xl border border-amber-400/30"
                  >
                    Start Learning <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bad Service */}
          <TabsContent value="bad" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ServiceSection
              title="Bad Service"
              subtitle="The Unhelpful Store"
              description={`Imagine walking into a clothing store. No one greets you. No smile. When you ask for help, the staff barely looks up. You're left wandering alone with no direction, feeling invisible.\n\n\nCold. Dismissive. Forgettable. You feel unseen and unimportant, like you're bothering them just by being there.\n\n\nIn a café, this looks like a barista who avoids eye contact, rushes through your order, and makes you feel like an interruption. Even if the drink is perfect, the experience leaves a bitter taste. No matter how delicious the coffee, the disconnected service makes it tasteless.`}
              takeaway="Service isn't about getting done with tasks, it's about people. If customers feel unseen, they won't return."
              imageDescription="A customer standing at a counter, barista looking away, arms crossed. Cold colors (grey/blue) show emotional distance."
              quote="Bad service feels colder than COLD BREW."
              colorScheme="cold"
              interactiveComponent={BadServiceScenario}
            />
            <div className="flex justify-end mt-6 md:mt-8">
              <Button 
                onClick={handleNext}
                className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-5 md:py-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-700 min-h-[44px] w-full sm:w-auto transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 font-semibold"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </div>
          </TabsContent>

          {/* Average Service */}
          <TabsContent value="average" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ServiceSection
              title="Average Service"
              subtitle="The Vending Machine"
              description={`Picture using a vending machine. You press a button, the machine dispenses your item, and you walk away. Everything works fine — order placed, item received, transaction complete. But there's no warmth, no emotion, no human connection.\n\n\nNeutral. Robotic. Functional but forgettable. Your needs are technically met, but it feels like a transaction rather than an interaction with another person.\n\n\nIn a café, this is when the barista takes your order, makes your drink, and hands it to you without any real engagement. No smile, no small talk, no recognition. It's efficient, but it lacks soul. The coffee might be good, but the experience is empty.`}
              takeaway="Average service delivers coffee, not connection. People often forget the perfect drink, but remember how you made them feel."
              imageDescription="Split image: one side shows a barista handing a drink without smiling; the other side, an actual vending machine."
              caption="When service feels mechanical, people disconnect. Spot the difference!"
              colorScheme="neutral"
              interactiveComponent={AverageServiceScenario}
            />
            <div className="flex justify-end mt-6 md:mt-8">
              <Button 
                onClick={handleNext}
                className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-5 md:py-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-700 min-h-[44px] w-full sm:w-auto transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 font-semibold"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </div>
          </TabsContent>

          {/* Excellent Service */}
          <TabsContent value="excellent" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ServiceSection
              title="Excellent Service"
              subtitle="The Favorite Barista"
              description={`Think of your favorite local shop where the owner knows your name, remembers your preferences, and greets you like an old friend. They ask about your day, make recommendations based on what they know you love, and genuinely care about your experience. It's not just a transaction, it's a relationship.\n\n\nSeen. Valued. Welcomed. You feel like you matter, like you're part of something special. You're not just another customer, you're appreciated.\n\n\nThis is where the magic happens in a café. The barista remembers your name and your usual order. They greet you with a genuine smile, maybe ask how your week's going. They make you feel like a friend, not a number. Customers don't just come back for the coffee. They come back because they feel connected. You're not serving drinks; you're building community.`}
              takeaway="Excellent service turns routine into relationship. Connection, not caffeine, keeps people coming back."
              imageDescription="A smiling barista handing coffee to a happy regular. Warm colors, cozy lighting. Speech bubble with welcome message."
              caption="Familiar faces & genuine warmth. That's excellent service."
              colorScheme="warm"
              interactiveComponent={ExcellentServiceScenario}
            />
            <div className="flex justify-end mt-6 md:mt-8">
              <Button 
                onClick={handleNext}
                className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-5 md:py-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-700 min-h-[44px] w-full sm:w-auto transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 font-semibold"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </div>
          </TabsContent>

          {/* Customer Reflection */}
          <TabsContent value="reflection" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="border border-white/30 backdrop-blur-2xl bg-white/30 transition-all duration-500 hover:shadow-3xl rounded-3xl hover:bg-white/40">
              <CardHeader className="px-4 md:px-6 pt-4 md:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Customer Reflection</CardTitle>
                    <CardDescription className="text-base md:text-lg font-semibold text-gray-700">The Mirror Effect</CardDescription>
                  </div>
                  <Badge className="backdrop-blur-xl bg-purple-500/90 hover:bg-purple-600/90 text-white shadow-sm self-start border border-purple-400/30">
                    Interactive
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6">
                {/* Main Concept */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 p-4 md:p-6 rounded-2xl border border-white/30 shadow-lg hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-pink-400/30 transition-all duration-500">
                  <p className="text-base md:text-lg font-bold text-gray-900 mb-3 text-center">
                    🪞 Customers are emotional mirrors — they reflect YOUR energy back to you.
                  </p>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed text-center">
                    Your facial expressions, tone of voice, and body language directly shape how customers respond to you.
                  </p>
                </div>

                {/* Interactive Mirror Component */}
                <MirrorEffectInteractive />

              </CardContent>
            </Card>
            <div className="flex justify-end mt-6 md:mt-8">
              <Button 
                onClick={handleNext}
                className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-5 md:py-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-700 min-h-[44px] w-full sm:w-auto transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 font-semibold"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </div>
          </TabsContent>

          {/* Empathy Assessment */}
          <TabsContent value="assessment" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <EmpathyAssessment />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-xl bg-neutral-900/90 text-neutral-200 py-6 md:py-8 mt-12 md:mt-16 border-t border-neutral-800/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-medium">Café Service Training Module • Creating Connection, One Cup at a Time ☕</p>
        </div>
      </footer>
    </div>
  );
}
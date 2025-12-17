import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ServiceSection from '@/components/ServiceSection';
import ProgressIndicator from '@/components/ProgressIndicator';
import EmpathyAssessment from '@/components/EmpathyAssessment';
import { Coffee, ArrowRight } from 'lucide-react';

export default function Index() {
  const [currentTab, setCurrentTab] = useState('intro');
  const [completedSections, setCompletedSections] = useState<string[]>([]);

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-orange-800 text-white py-6 md:py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
            <Coffee className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-2xl md:text-4xl font-bold text-center">Café Service Training</h1>
          </div>
          <p className="text-center text-amber-100 text-sm md:text-lg">Section 1: What Great Service Looks Like</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-12">
        <ProgressIndicator currentSection={currentIndex} totalSections={sections.length} />

        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          {/* Pill-Shaped Navigation */}
          <div className="mb-6 md:mb-8 overflow-x-auto pb-2">
            <TabsList className="inline-flex items-center justify-start gap-2 bg-transparent h-auto p-0 w-auto min-w-full">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  aria-label={section.label}
                  title={section.label}
                  className={`
                    rounded-full px-4 md:px-5 py-2.5 md:py-3 min-h-[44px] min-w-[44px]
                    text-2xl md:text-3xl
                    border-2 border-gray-300
                    bg-white hover:bg-gray-50
                    data-[state=active]:text-white
                    data-[state=active]:shadow-lg
                    transition-all duration-300
                    flex-shrink-0
                    ${getActiveColorClass(section.color)}
                  `}
                >
                  <span className="block" role="img" aria-label={section.label}>
                    {section.emoji}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Introduction */}
          <TabsContent value="intro" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border border-amber-200 bg-gradient-to-br from-white to-amber-50 shadow-lg rounded-xl">
              <CardHeader className="text-center pb-4 px-4 md:px-6">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Customer Service Excellence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="text-6xl md:text-8xl animate-bounce">☕</div>
                </div>
                <div className="bg-amber-100 border-l-4 border-amber-600 p-4 md:p-6 rounded-xl">
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium text-center">
                    Every café moment falls somewhere between bad, average, and excellent.
                  </p>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
                    The secret is learning how to move from <span className="font-bold text-amber-700">"just doing the job"</span> to <span className="font-bold text-amber-700">creating connection</span>.
                  </p>
                </div>
                <div className="text-center pt-4">
                  <p className="text-sm md:text-base text-gray-600 mb-4">Ready to learn what makes service truly exceptional?</p>
                  <Button 
                    onClick={handleNext}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-xl shadow-md transition-all duration-300 min-h-[44px] w-full sm:w-auto"
                  >
                    Start Learning <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
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
              description="Let's say you walk into a clothing store, no greeting, no smile. When you ask for help, they barely look up and you're left exploring on your own with no direction. In a café, when a barista avoids eye contact and rushes the order. How it feels: Cold. Dismissive. Forgettable. Even a delicious drink can't fix a disconnected experience. No matter how perfect the drink was, the experience was still tasteless."
              takeaway="Service isn't about getting done with tasks, it's about people. If customers feel unseen, they won't return."
              imageDescription="A customer standing at a counter, barista looking away, arms crossed. Cold colors (grey/blue) show emotional distance."
              quote="Bad service feels colder than COLD BREW."
              colorScheme="cold"
            />
            <div className="flex justify-end mt-4 md:mt-6">
              <Button 
                onClick={handleNext}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 md:px-6 py-4 md:py-3 rounded-xl shadow-md transition-all duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Average Service */}
          <TabsContent value="average" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ServiceSection
              title="Average Service"
              subtitle="The Vending Machine"
              description="Everything works fine - order placed, drink made, transaction complete. Like in a vending machine, there's no warmth. No emotion. Just efficiency. How the customer feels: Neutral and robotic. Needs are met, but it feels like a transaction rather than a genuine human experience."
              takeaway="Average service delivers coffee, not connection. People often forget the perfect drink, but remember how you made them feel."
              imageDescription="Split image: one side shows a barista handing a drink without smiling; the other side, an actual vending machine."
              caption="When service feels mechanical, people disconnect. Spot the difference!"
              colorScheme="neutral"
            />
            <div className="flex justify-end mt-4 md:mt-6">
              <Button 
                onClick={handleNext}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 md:px-6 py-4 md:py-3 rounded-xl shadow-md transition-all duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Excellent Service */}
          <TabsContent value="excellent" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ServiceSection
              title="Excellent Service"
              subtitle="The Favorite Barista"
              description="This is where magic happens. The barista remembers your name, your drink, and greets you like a friend. How the customer feels: Seen, valued, and welcomed. Customers feel like a part of the café, not just visitors."
              takeaway="Excellent service turns routine into relationship. Connection, not caffeine, keeps people coming back."
              imageDescription="A smiling barista handing coffee to a happy regular. Warm colors, cozy lighting. Speech bubble with welcome message."
              caption="Familiar faces, genuine warmth — that's excellent service."
              colorScheme="warm"
            />
            <div className="flex justify-end mt-4 md:mt-6">
              <Button 
                onClick={handleNext}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 md:px-6 py-4 md:py-3 rounded-xl shadow-md transition-all duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Next Section <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Customer Reflection */}
          <TabsContent value="reflection" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ServiceSection
              title="Customer Reflection"
              subtitle="The Mirror Test"
              description="Customers reflect what they receive. If you're warm, they open up. If you're distant, they retreat."
              takeaway="Your attitude sets the emotional tone. The energy you give is the experience they take home."
              imageDescription="Cartoon of a barista smiling at a customer, and the customer smiling back like a mirror image."
              caption="Service is a reflection game."
              colorScheme="mirror"
            />
            <div className="flex justify-end mt-6 md:mt-8">
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 md:px-8 py-5 md:py-4 text-base md:text-lg shadow-lg rounded-xl transition-all duration-300 min-h-[44px] w-full sm:w-auto"
              >
                Take Empathy Assessment <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </TabsContent>

          {/* Empathy Assessment */}
          <TabsContent value="assessment" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <EmpathyAssessment />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-4 md:py-6 mt-8 md:mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm">Café Service Training Module • Creating Connection, One Cup at a Time</p>
        </div>
      </footer>
    </div>
  );
}
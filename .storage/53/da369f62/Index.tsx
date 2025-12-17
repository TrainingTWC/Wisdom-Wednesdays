import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceSection from '@/components/ServiceSection';
import ProgressIndicator from '@/components/ProgressIndicator';
import EmpathyAssessment from '@/components/EmpathyAssessment';
import { Coffee, BookOpen, TrendingDown, TrendingUp, Star, Brain, Target } from 'lucide-react';

export default function Index() {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const sections = [
    { id: 'intro', label: 'Introduction', icon: BookOpen },
    { id: 'bad', label: 'Poor Service', icon: TrendingDown },
    { id: 'average', label: 'Average Service', icon: TrendingUp },
    { id: 'excellent', label: 'Excellent Service', icon: Star },
    { id: 'reflection', label: 'Reflection', icon: Brain },
    { id: 'assessment', label: 'Assessment', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 glass border-b border-neutral-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">Customer Service Excellence</h1>
                <p className="text-xs text-neutral-500 font-medium">Interactive Training Module</p>
              </div>
            </div>
            <ProgressIndicator completed={completedSections.length} total={sections.length - 1} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <Tabs defaultValue="intro" className="w-full">
          {/* Modern Tab Navigation */}
          <TabsList className="w-full h-auto p-1.5 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-2xl shadow-sm mb-8">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 w-full">
              {sections.map((section) => {
                const Icon = section.icon;
                const isCompleted = completedSections.includes(section.id);
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="relative px-3 py-2.5 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/20 transition-all duration-300 hover:bg-neutral-100/80 group"
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium hidden md:block">{section.label}</span>
                      {isCompleted && section.id !== 'assessment' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </TabsTrigger>
                );
              })}
            </div>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="intro" className="mt-0">
            <ServiceSection
              id="intro"
              title="Welcome to Customer Service Excellence"
              description="Learn the fundamentals of exceptional café customer service"
              level="introduction"
              emoji="👋"
              content={{
                overview:
                  "In the café industry, customer service isn't just about serving coffee—it's about creating memorable experiences. This training will help you understand the spectrum of service quality and develop skills to consistently deliver excellence.",
                keyPoints: [
                  'Understanding customer expectations in café environments',
                  'The impact of service quality on customer loyalty and business success',
                  'Key principles of empathy, approachability, reliability, and warmth',
                  'Reading visual cues: facial expressions, tone, and body language',
                ],
                practicalTips: [
                  'Every customer interaction is an opportunity to create a positive impression',
                  'Small gestures of kindness can transform an ordinary transaction into a memorable experience',
                  'Consistency in service quality builds trust and loyalty',
                  'Your attitude and energy directly influence the café atmosphere',
                ],
              }}
              onComplete={handleSectionComplete}
            />
          </TabsContent>

          <TabsContent value="bad" className="mt-0">
            <ServiceSection
              id="bad"
              title="Poor Service Examples"
              description="Learn what to avoid in customer interactions"
              level="bad"
              emoji="😞"
              content={{
                overview:
                  "Understanding poor service helps us recognize and avoid these behaviors. These examples show how negative interactions damage customer relationships and harm business reputation.",
                keyPoints: [
                  'Ignoring customers or making them feel invisible',
                  'Showing impatience, frustration, or dismissive attitudes',
                  'Failing to acknowledge customer emotions or concerns',
                  'Providing inconsistent or unreliable service',
                ],
                scenarios: [
                  {
                    title: 'The Invisible Customer',
                    situation: 'A customer waits at the counter while staff chat among themselves, not acknowledging their presence.',
                    impact: 'Customer feels unvalued and ignored, likely to leave and share negative experience.',
                    lesson: 'Always acknowledge customers immediately, even if you need a moment to finish a task.',
                  },
                  {
                    title: 'The Dismissive Response',
                    situation: 'Customer asks about dairy alternatives, staff sighs and says "We only have regular milk."',
                    impact: 'Customer feels their needs are a burden, damaging approachability and warmth.',
                    lesson: 'Treat all requests with respect and offer alternatives when possible.',
                  },
                ],
                practicalTips: [
                  'Never show visible frustration or impatience with customers',
                  'Avoid multitasking when directly serving someone',
                  'Don't dismiss customer concerns, even if they seem minor',
                  'Maintain professional composure regardless of personal stress',
                ],
              }}
              onComplete={handleSectionComplete}
            />
          </TabsContent>

          <TabsContent value="average" className="mt-0">
            <ServiceSection
              id="average"
              title="Average Service Examples"
              description="Functional but unremarkable customer interactions"
              level="average"
              emoji="😐"
              content={{
                overview:
                  "Average service gets the job done but misses opportunities to create memorable experiences. It's transactional rather than relational, meeting basic expectations without exceeding them.",
                keyPoints: [
                  'Completing transactions efficiently but without warmth',
                  'Following procedures but lacking personal connection',
                  'Polite but not genuinely engaging with customers',
                  'Missing opportunities to read and respond to emotional cues',
                ],
                scenarios: [
                  {
                    title: 'The Robotic Transaction',
                    situation: 'Staff takes order, processes payment, and hands over drink with minimal eye contact or conversation.',
                    impact: 'Transaction completed but no connection made, customer unlikely to remember the experience.',
                    lesson: 'Add personal touches: smile, make eye contact, use friendly tone.',
                  },
                  {
                    title: 'The Missed Opportunity',
                    situation: 'Regular customer looks tired, staff serves usual order without acknowledging their visible stress.',
                    impact: 'Functional service but missed chance to show empathy and build loyalty.',
                    lesson: 'Notice and respond to customer emotions, even with small gestures.',
                  },
                ],
                practicalTips: [
                  'Go beyond scripted responses to show genuine interest',
                  'Notice and acknowledge regular customers',
                  'Add small personal touches to transactions',
                  'Read body language and adjust your approach accordingly',
                ],
              }}
              onComplete={handleSectionComplete}
            />
          </TabsContent>

          <TabsContent value="excellent" className="mt-0">
            <ServiceSection
              id="excellent"
              title="Excellent Service Examples"
              description="Creating memorable experiences through exceptional service"
              level="excellent"
              emoji="⭐"
              content={{
                overview:
                  "Excellent service combines efficiency with genuine human connection. It's about reading customer needs, responding with empathy, and creating moments that customers remember and share.",
                keyPoints: [
                  'Anticipating needs before customers ask',
                  'Showing genuine warmth and creating personal connections',
                  'Demonstrating reliability while maintaining flexibility',
                  'Reading and responding appropriately to emotional cues',
                ],
                scenarios: [
                  {
                    title: 'The Rushed Morning Hero',
                    situation: 'Staff notices customer checking watch anxiously, immediately offers: "Running late? I\'ll get you sorted super fast!"',
                    impact: 'Customer feels seen and valued, stress reduced, creates positive association with café.',
                    lesson: 'Read visual cues (body language, facial expressions) and respond proactively.',
                  },
                  {
                    title: 'The Comfort Provider',
                    situation: 'Regular customer looks down, staff gently says: "Rough day? I\'ll make your usual extra special."',
                    impact: 'Customer feels cared for beyond transaction, strengthens loyalty and emotional connection.',
                    lesson: 'Balance empathy with respect for privacy, show you notice and care.',
                  },
                  {
                    title: 'The Welcoming Guide',
                    situation: 'New customer looks confused at menu, staff approaches: "First time here? I\'d love to help you find something perfect!"',
                    impact: 'Customer feels welcomed and guided, not pressured, likely to return.',
                    lesson: 'High approachability combined with helpful guidance creates positive first impressions.',
                  },
                ],
                practicalTips: [
                  'Make eye contact and smile genuinely',
                  'Use customer names when appropriate',
                  'Anticipate needs by reading body language and context',
                  'Go slightly beyond expectations with small gestures',
                  'Remember regular customers and their preferences',
                  'Show enthusiasm for helping, not just completing tasks',
                ],
              }}
              onComplete={handleSectionComplete}
            />
          </TabsContent>

          <TabsContent value="reflection" className="mt-0">
            <ServiceSection
              id="reflection"
              title="Reflection & Key Takeaways"
              description="Synthesize your learning and commit to excellence"
              level="reflection"
              emoji="💭"
              content={{
                overview:
                  "Great customer service is a skill that develops with practice and conscious effort. Reflect on what you've learned and commit to applying these principles in every interaction.",
                keyPoints: [
                  'Service quality exists on a spectrum—aim for excellence consistently',
                  'The four key indicators: Empathy, Approachability, Reliability, Warmth',
                  'Visual cues (expressions, tone, body language) reveal customer needs',
                  'Small actions create significant impacts on customer experience',
                ],
                reflectionQuestions: [
                  'Which service level do you most commonly provide? How can you elevate it?',
                  'What visual cues do you tend to miss? How can you become more observant?',
                  'Which indicator (Empathy, Approachability, Reliability, Warmth) is your strength? Which needs development?',
                  'Think of your best customer service experience—what made it memorable?',
                ],
                practicalTips: [
                  'Start each shift with intention to create positive experiences',
                  'Practice reading body language and facial expressions consciously',
                  'After each interaction, briefly reflect: could I have done better?',
                  'Remember: customers may forget what you said, but they'll remember how you made them feel',
                  'Excellence isn't perfection—it's consistent effort to care and connect',
                ],
              }}
              onComplete={handleSectionComplete}
            />
          </TabsContent>

          <TabsContent value="assessment" className="mt-0">
            <EmpathyAssessment />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
import { useState } from 'react';
import { Mic, MicOff, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { OrbVisualizer } from '@/components/OrbVisualizer';
import { PetFace } from '@/components/PetFace';
import { VoiceInput } from '@/components/VoiceInput';
import { VoiceOutput } from '@/components/VoiceOutput';

type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

const Dashboard = () => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [petSpeaking, setPetSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [assistantResponse, setAssistantResponse] = useState<string>('');

  const handleWakeWordDetected = () => {
    setOrbState('listening');
  };

  const handleTranscribed = async (text: string) => {
    console.log('Processing command:', text);
    setLastCommand(text);
    setOrbState('thinking');
    
    try {
      // Use AssistantLogic to process the command
      const { AssistantLogic } = await import('@/services/assistant/AssistantLogic');
      const response = await AssistantLogic.processCommand(text);
      
      console.log('Assistant response:', response);
      setAssistantResponse(response.speech);
      setOrbState('speaking');
    } catch (error) {
      console.error('Error processing command:', error);
      setAssistantResponse("I'm sorry, I encountered an error processing that command.");
      setOrbState('speaking');
    }
  };

  const handleVoiceStart = () => {
    setPetSpeaking(true);
  };

  const handleVoiceEnd = () => {
    setPetSpeaking(false);
    setOrbState('idle');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-dark-surface to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-neon-cyan" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              JARVIS
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {lastCommand && `Last command: "${lastCommand}"`}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMicEnabled(!micEnabled)}
            className={`glass-surface ${micEnabled ? 'text-neon-cyan border-neon-cyan/30' : 'text-muted-foreground'}`}
          >
            {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="icon" className="glass-surface">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Assistant Column */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-8">
            {/* Pet Face */}
            <div className="glass-surface rounded-2xl p-8 w-full max-w-sm">
              <PetFace 
                speaking={petSpeaking}
                emotion="happy"
                eyeX={0}
                eyeY={0}
              />
            </div>

            {/* Orb Visualizer */}
            <div className="relative">
              <OrbVisualizer 
                state={orbState}
                audioEnabled={micEnabled}
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground capitalize">
                {orbState}
              </div>
            </div>

            {/* Status */}
            {assistantResponse && (
              <Card className="glass-surface p-4 max-w-sm">
                <p className="text-sm text-center text-foreground">
                  "{assistantResponse}"
                </p>
              </Card>
            )}
          </div>

          {/* Dashboard Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tasks" className="h-full">
              <TabsList className="glass-surface mb-6 w-full justify-start p-1">{/* Added padding */}
                <TabsTrigger value="tasks" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="music" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  Music
                </TabsTrigger>
                <TabsTrigger value="wellness" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  Wellness
                </TabsTrigger>
              </TabsList>

              <div className="h-[calc(100%-60px)]">
                <TabsContent value="tasks" className="h-full">
                  <Card className="glass-surface h-full p-6">
                    <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Active Tasks</h3>
                    <div className="space-y-3">
                      {[
                        "Review quarterly reports",
                        "Schedule team meeting",
                        "Update project documentation",
                        "Prepare presentation slides"
                      ].map((task, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dark-surface/50 border border-border/20">
                          <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                          <span className="text-foreground">{task}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar" className="h-full">
                  <Card className="glass-surface h-full p-6">
                    <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Today's Schedule</h3>
                    <div className="space-y-4">
                      {[
                        { time: "09:00", event: "Morning Standup", duration: "30 min" },
                        { time: "11:00", event: "Client Review", duration: "1 hour" },
                        { time: "14:00", event: "Design Review", duration: "45 min" },
                        { time: "16:00", event: "Team Sync", duration: "30 min" }
                      ].map((meeting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-dark-surface/50 border border-border/20">
                          <div>
                            <div className="font-medium text-foreground">{meeting.event}</div>
                            <div className="text-sm text-muted-foreground">{meeting.duration}</div>
                          </div>
                          <div className="text-neon-cyan font-mono">{meeting.time}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="music" className="h-full">
                  <Card className="glass-surface h-full p-6">
                    <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Focus Playlist</h3>
                    <div className="space-y-3">
                      {[
                        "Deep Focus - Ambient Mix",
                        "Coding Flow - Electronic",
                        "Productivity Boost - Lo-fi",
                        "Creative Session - Instrumental"
                      ].map((playlist, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dark-surface/50 border border-border/20 hover:border-neon-cyan/30 transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center">
                            <span className="text-xs font-bold text-background">♪</span>
                          </div>
                          <span className="text-foreground">{playlist}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="wellness" className="h-full">
                  <Card className="glass-surface h-full p-6">
                    <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Wellness Dashboard</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Steps Today", value: "8,547", target: "10,000" },
                        { label: "Water Intake", value: "6 cups", target: "8 cups" },
                        { label: "Sleep Last Night", value: "7.5 hours", target: "8 hours" },
                        { label: "Focus Time", value: "4.2 hours", target: "6 hours" }
                      ].map((metric, index) => (
                        <div key={index} className="p-4 rounded-lg bg-dark-surface/50 border border-border/20">
                          <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                          <div className="text-xl font-bold text-neon-cyan mb-1">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">Goal: {metric.target}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Voice Components */}
      <VoiceInput 
        enabled={micEnabled}
        onWakeWordDetected={handleWakeWordDetected}
        onTranscribed={handleTranscribed}
        onError={(error) => console.error('Voice input error:', error)}
      />
      
      <VoiceOutput 
        text={assistantResponse}
        onStart={handleVoiceStart}
        onEnd={handleVoiceEnd}
      />
    </div>
  );
};

export default Dashboard;
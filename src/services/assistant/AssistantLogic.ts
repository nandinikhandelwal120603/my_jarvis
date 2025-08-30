// // interface AssistantResponse {
// //   speech: string;
// //   action?: {
// //     type: 'task' | 'calendar' | 'music' | 'wellness';
// //     payload: any;
// //   };
// //   shouldTTS: boolean;
// // }

// // export class AssistantLogic {
// //   static async processCommand(input: string): Promise<AssistantResponse> {
// //     const normalizedInput = input.toLowerCase().trim();
    
// //     // Task-related commands
// //     if (this.isTaskCommand(normalizedInput)) {
// //       return await this.handleTaskCommand(normalizedInput);
// //     }
    
// //     // Calendar-related commands
// //     if (this.isCalendarCommand(normalizedInput)) {
// //       return await this.handleCalendarCommand(normalizedInput);
// //     }
    
// //     // Music-related commands
// //     if (this.isMusicCommand(normalizedInput)) {
// //       return await this.handleMusicCommand(normalizedInput);
// //     }
    
// //     // Wellness-related commands
// //     if (this.isWellnessCommand(normalizedInput)) {
// //       return await this.handleWellnessCommand(normalizedInput);
// //     }
    
// //     // Fallback to OpenAI for general conversation
// //     return await this.handleGeneralQuery(normalizedInput);
// //   }
  
// //   private static isTaskCommand(input: string): boolean {
// //     const taskKeywords = ['task', 'todo', 'add', 'complete', 'finish', 'done', 'work', 'project'];
// //     return taskKeywords.some(keyword => input.includes(keyword));
// //   }
  
// //   private static isCalendarCommand(input: string): boolean {
// //     const calendarKeywords = ['meeting', 'schedule', 'calendar', 'appointment', 'event', 'time', 'when'];
// //     return calendarKeywords.some(keyword => input.includes(keyword));
// //   }
  
// //   private static isMusicCommand(input: string): boolean {
// //     const musicKeywords = ['play', 'music', 'song', 'playlist', 'spotify', 'pause', 'stop', 'volume'];
// //     return musicKeywords.some(keyword => input.includes(keyword));
// //   }
  
// //   private static isWellnessCommand(input: string): boolean {
// //     const wellnessKeywords = ['health', 'steps', 'water', 'sleep', 'wellness', 'fitness', 'exercise'];
// //     return wellnessKeywords.some(keyword => input.includes(keyword));
// //   }
  
// //   private static async handleTaskCommand(input: string): Promise<AssistantResponse> {
// //     // Mock task handling
// //     if (input.includes('add') || input.includes('create')) {
// //       return {
// //         speech: "I've added a new task to your list. It will appear on your tasks dashboard.",
// //         action: {
// //           type: 'task',
// //           payload: { action: 'add', task: input }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     if (input.includes('complete') || input.includes('done')) {
// //       return {
// //         speech: "Great! I've marked that task as completed. Keep up the good work!",
// //         action: {
// //           type: 'task',
// //           payload: { action: 'complete', task: input }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     return {
// //       speech: "You have 4 active tasks. The most urgent one is reviewing quarterly reports.",
// //       shouldTTS: true
// //     };
// //   }
  
// //   private static async handleCalendarCommand(input: string): Promise<AssistantResponse> {
// //     // Mock calendar handling
// //     if (input.includes('today') || input.includes('schedule')) {
// //       return {
// //         speech: "You have 4 meetings today. Your next meeting is at 11 AM for the client review.",
// //         action: {
// //           type: 'calendar',
// //           payload: { action: 'view_today' }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     if (input.includes('meeting') || input.includes('appointment')) {
// //       return {
// //         speech: "I can help you schedule a meeting. What time works best for you?",
// //         action: {
// //           type: 'calendar',
// //           payload: { action: 'schedule' }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     return {
// //       speech: "Your calendar looks busy this week. You have 12 meetings scheduled.",
// //       shouldTTS: true
// //     };
// //   }
  
// //   private static async handleMusicCommand(input: string): Promise<AssistantResponse> {
// //     // Mock music handling
// //     if (input.includes('play')) {
// //       return {
// //         speech: "Now playing your Deep Focus playlist. Perfect for productivity!",
// //         action: {
// //           type: 'music',
// //           payload: { action: 'play', playlist: 'Deep Focus' }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     if (input.includes('pause') || input.includes('stop')) {
// //       return {
// //         speech: "Music paused. Back to the silence of focused work.",
// //         action: {
// //           type: 'music',
// //           payload: { action: 'pause' }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     return {
// //       speech: "I can play your focus playlists to help you concentrate. What would you like to hear?",
// //       shouldTTS: true
// //     };
// //   }
  
// //   private static async handleWellnessCommand(input: string): Promise<AssistantResponse> {
// //     // Mock wellness handling
// //     if (input.includes('steps')) {
// //       return {
// //         speech: "You've taken 8,547 steps today. Just 1,453 more to reach your goal!",
// //         action: {
// //           type: 'wellness',
// //           payload: { action: 'view_steps' }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     if (input.includes('water')) {
// //       return {
// //         speech: "You've had 6 cups of water today. Remember to stay hydrated - 2 more cups to go!",
// //         action: {
// //           type: 'wellness',
// //           payload: { action: 'view_water' }
// //         },
// //         shouldTTS: true
// //       };
// //     }
    
// //     return {
// //       speech: "Your wellness metrics look good today. You're 75% of the way to your daily goals.",
// //       shouldTTS: true
// //     };
// //   }
  
// //   private static async handleGeneralQuery(input: string): Promise<AssistantResponse> {
// //     // Mock responses for general queries
// //     const responses = [
// //       "I'm here to help you stay organized and productive. What can I assist you with?",
// //       "That's an interesting question. I'm analyzing the best way to help you with that.",
// //       "I understand. Let me see how I can make your day more efficient.",
// //       "Absolutely! I'm designed to help you manage your digital workspace seamlessly.",
// //       "I'm processing that request. My systems are optimized for your productivity needs."
// //     ];
    
// //     return {
// //       speech: responses[Math.floor(Math.random() * responses.length)],
// //       shouldTTS: true
// //     };
// //   }
// // }import OpenAI from "openai";
// import { MockCalendarAPI, CalendarEvent } from "@/mocks/calendarApi"; // replace with Google Calendar API
// import { SpotifyAPI } from "@/services/music/SpotifyAPI"; // your Spotify integration
// import { EmailAPI } from "@/services/email/EmailAPI"; // email fetching
// import { FirebaseService } from "@/services/firebase/FirebaseService"; // tasks, journaling, sleep

// export interface AssistantResponse {
//   speech: string;
//   action?: {
//     type: "task" | "calendar" | "music" | "wellness" | "journal" | "email";
//     payload?: any;
//   };
//   shouldTTS: boolean;
// }

// export class AssistantLogic {
//   private static openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//   static async processCommand(input: string, userName: string = "Nandini"): Promise<AssistantResponse> {
//     const normalizedInput = input.toLowerCase().trim();

//     // Greetings
//     if (/good morning|hello|hi|hey/i.test(normalizedInput)) {
//       return await this.handleGreeting(userName);
//     }

//     // Sleep tracking
//     if (/going to bed|sleep/i.test(normalizedInput)) {
//       return await this.handleSleep();
//     }

//     // Journaling
//     if (/journal|diary/i.test(normalizedInput)) {
//       return await this.handleJournaling(input);
//     }

//     // Task commands
//     if (this.isTaskCommand(normalizedInput)) return await this.handleTaskCommand(normalizedInput);

//     // Calendar commands
//     if (this.isCalendarCommand(normalizedInput)) return await this.handleCalendarCommand(normalizedInput);

//     // Music commands
//     if (this.isMusicCommand(normalizedInput)) return await this.handleMusicCommand(normalizedInput);

//     // Wellness commands
//     if (this.isWellnessCommand(normalizedInput)) return await this.handleWellnessCommand(normalizedInput);

//     // Emails
//     if (/email|mail/i.test(normalizedInput)) return await this.handleEmails();

//     // Fallback to OpenAI/Gemini for natural conversation
//     return await this.handleGeneralQuery(input, userName);
//   }

//   private static isTaskCommand(input: string): boolean {
//     const keywords = ["task", "todo", "add", "complete", "finish", "done", "work", "project"];
//     return keywords.some(k => input.includes(k));
//   }

//   private static isCalendarCommand(input: string): boolean {
//     const keywords = ["meeting", "schedule", "calendar", "appointment", "event", "time", "when"];
//     return keywords.some(k => input.includes(k));
//   }

//   private static isMusicCommand(input: string): boolean {
//     const keywords = ["play", "music", "song", "playlist", "spotify", "pause", "stop", "volume"];
//     return keywords.some(k => input.includes(k));
//   }

//   private static isWellnessCommand(input: string): boolean {
//     const keywords = ["health", "steps", "water", "sleep", "wellness", "fitness", "exercise"];
//     return keywords.some(k => input.includes(k));
//   }

//   // === GREETING ===
//   private static async handleGreeting(name: string): Promise<AssistantResponse> {
//     const today = new Date();
//     const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

//     const emails = await EmailAPI.getUnreadEmails();
//     const events = await MockCalendarAPI.getTodaysEvents();
//     const freeSlot = this.findFreeSlot(events);

//     const speech = `Good morning, ${name}! ☀️ Today is ${dateStr}. You have ${emails.length} unread emails, and your first meeting is at ${
//       events[0]?.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "none"
//     }. I noticed a free slot ${freeSlot}. Want me to suggest something fun or relaxing there?`;

//     return {
//       speech,
//       shouldTTS: true,
//       action: { type: "calendar", payload: { todayEvents: events } },
//     };
//   }

//   // === TASKS ===
//   private static async handleTaskCommand(input: string): Promise<AssistantResponse> {
//     if (/add|create/i.test(input)) {
//       const newTask = await FirebaseService.addTask({ title: input });
//       return { speech: `Added "${newTask.title}" to your tasks. 📌`, shouldTTS: true, action: { type: "task", payload: newTask } };
//     }

//     if (/complete|done/i.test(input)) {
//       const completed = await FirebaseService.completeTask(input);
//       return { speech: `Marked "${completed?.title}" as completed. ✅`, shouldTTS: true, action: { type: "task", payload: completed } };
//     }

//     const tasks = await FirebaseService.getTasks();
//     return { speech: `You have ${tasks.length} active tasks. Most urgent: "${tasks[0]?.title}". 💡`, shouldTTS: true };
//   }

//   // === CALENDAR ===
//   private static async handleCalendarCommand(input: string): Promise<AssistantResponse> {
//     if (/today|schedule/i.test(input)) {
//       const events = await MockCalendarAPI.getTodaysEvents();
//       return { speech: `You have ${events.length} meetings today. Next: ${events[0]?.title} at ${events[0]?.startTime.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}.`, shouldTTS: true, action: { type: "calendar", payload: { events } } };
//     }

//     if (/meeting|appointment/i.test(input)) {
//       return { speech: "Sure! What time should I schedule it?", shouldTTS: true, action: { type: "calendar", payload: { action: "schedule" } } };
//     }

//     return { speech: "Your calendar looks good today.", shouldTTS: true };
//   }

//   // === MUSIC ===
//   private static async handleMusicCommand(input: string): Promise<AssistantResponse> {
//     const match = input.match(/play (.+)/i);
//     if (match) {
//       const track = match[1];
//       await SpotifyAPI.play(track);
//       return { speech: `Playing "${track}" on Spotify. 🎶`, shouldTTS: true, action: { type: "music", payload: { track } } };
//     }
//     return { speech: "What would you like to listen to?", shouldTTS: true };
//   }

//   // === WELLNESS ===
//   private static async handleWellnessCommand(input: string): Promise<AssistantResponse> {
//     if (/steps/i.test(input)) {
//       return { speech: `You've taken 8,547 steps today. Almost there! 👟`, shouldTTS: true, action: { type: "wellness", payload: { action: "view_steps" } } };
//     }
//     if (/water/i.test(input)) {
//       return { speech: `6 cups of water today. Stay hydrated! 💧`, shouldTTS: true, action: { type: "wellness", payload: { action: "view_water" } } };
//     }
//     return { speech: "Wellness looks good today. You're on track! 💪", shouldTTS: true };
//   }

//   // === EMAILS ===
//   private static async handleEmails(): Promise<AssistantResponse> {
//     const emails = await EmailAPI.getUnreadEmails();
//     return { speech: `You have ${emails.length} unread emails. Most recent from ${emails[0]?.from || "someone"}: "${emails[0]?.subject}"`, shouldTTS: true, action: { type: "email", payload: emails } };
//   }

//   // === JOURNALING ===
//   private static async handleJournaling(input: string): Promise<AssistantResponse> {
//     await FirebaseService.addJournalEntry({ content: input, timestamp: new Date() });
//     return { speech: "Saved your journal entry. ✍️ How was your mood today?", shouldTTS: true, action: { type: "journal", payload: input } };
//   }

//   // === SLEEP TRACKING ===
//   private static async handleSleep(): Promise<AssistantResponse> {
//     await FirebaseService.recordSleep(new Date());
//     return { speech: "Recorded your bedtime. Sweet dreams! 😴", shouldTTS: true };
//   }

//   // === GENERAL / NLP ===
//   private static async handleGeneralQuery(input: string, userName: string): Promise<AssistantResponse> {
//     const completion = await this.openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: `You are Jarvis, a friendly assistant for ${userName}. You handle tasks, calendar, music, emails, wellness, and journaling naturally.` },
//         { role: "user", content: input },
//       ],
//     });
//     return { speech: completion.choices[0].message?.content || "Sorry, I didn't understand that.", shouldTTS: true };
//   }

//   // === HELPER: FREE SLOT ===
//   private static findFreeSlot(events: CalendarEvent[]): string {
//     // simple mock: return first free slot between 9am-5pm
//     const busyTimes = events.map(e => e.startTime.getHours());
//     for (let h = 9; h <= 17; h++) {
//       if (!busyTimes.includes(h)) return `at ${h}:00`;
//     }
//     return "no free slots today";
//   }
// }

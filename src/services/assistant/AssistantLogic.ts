interface AssistantResponse {
  speech: string;
  action?: {
    type: 'task' | 'calendar' | 'music' | 'wellness';
    payload: any;
  };
  shouldTTS: boolean;
}

export class AssistantLogic {
  static async processCommand(input: string): Promise<AssistantResponse> {
    const normalizedInput = input.toLowerCase().trim();
    
    // Task-related commands
    if (this.isTaskCommand(normalizedInput)) {
      return await this.handleTaskCommand(normalizedInput);
    }
    
    // Calendar-related commands
    if (this.isCalendarCommand(normalizedInput)) {
      return await this.handleCalendarCommand(normalizedInput);
    }
    
    // Music-related commands
    if (this.isMusicCommand(normalizedInput)) {
      return await this.handleMusicCommand(normalizedInput);
    }
    
    // Wellness-related commands
    if (this.isWellnessCommand(normalizedInput)) {
      return await this.handleWellnessCommand(normalizedInput);
    }
    
    // Fallback to OpenAI for general conversation
    return await this.handleGeneralQuery(normalizedInput);
  }
  
  private static isTaskCommand(input: string): boolean {
    const taskKeywords = ['task', 'todo', 'add', 'complete', 'finish', 'done', 'work', 'project'];
    return taskKeywords.some(keyword => input.includes(keyword));
  }
  
  private static isCalendarCommand(input: string): boolean {
    const calendarKeywords = ['meeting', 'schedule', 'calendar', 'appointment', 'event', 'time', 'when'];
    return calendarKeywords.some(keyword => input.includes(keyword));
  }
  
  private static isMusicCommand(input: string): boolean {
    const musicKeywords = ['play', 'music', 'song', 'playlist', 'spotify', 'pause', 'stop', 'volume'];
    return musicKeywords.some(keyword => input.includes(keyword));
  }
  
  private static isWellnessCommand(input: string): boolean {
    const wellnessKeywords = ['health', 'steps', 'water', 'sleep', 'wellness', 'fitness', 'exercise'];
    return wellnessKeywords.some(keyword => input.includes(keyword));
  }
  
  private static async handleTaskCommand(input: string): Promise<AssistantResponse> {
    // Mock task handling
    if (input.includes('add') || input.includes('create')) {
      return {
        speech: "I've added a new task to your list. It will appear on your tasks dashboard.",
        action: {
          type: 'task',
          payload: { action: 'add', task: input }
        },
        shouldTTS: true
      };
    }
    
    if (input.includes('complete') || input.includes('done')) {
      return {
        speech: "Great! I've marked that task as completed. Keep up the good work!",
        action: {
          type: 'task',
          payload: { action: 'complete', task: input }
        },
        shouldTTS: true
      };
    }
    
    return {
      speech: "You have 4 active tasks. The most urgent one is reviewing quarterly reports.",
      shouldTTS: true
    };
  }
  
  private static async handleCalendarCommand(input: string): Promise<AssistantResponse> {
    // Mock calendar handling
    if (input.includes('today') || input.includes('schedule')) {
      return {
        speech: "You have 4 meetings today. Your next meeting is at 11 AM for the client review.",
        action: {
          type: 'calendar',
          payload: { action: 'view_today' }
        },
        shouldTTS: true
      };
    }
    
    if (input.includes('meeting') || input.includes('appointment')) {
      return {
        speech: "I can help you schedule a meeting. What time works best for you?",
        action: {
          type: 'calendar',
          payload: { action: 'schedule' }
        },
        shouldTTS: true
      };
    }
    
    return {
      speech: "Your calendar looks busy this week. You have 12 meetings scheduled.",
      shouldTTS: true
    };
  }
  
  private static async handleMusicCommand(input: string): Promise<AssistantResponse> {
    // Mock music handling
    if (input.includes('play')) {
      return {
        speech: "Now playing your Deep Focus playlist. Perfect for productivity!",
        action: {
          type: 'music',
          payload: { action: 'play', playlist: 'Deep Focus' }
        },
        shouldTTS: true
      };
    }
    
    if (input.includes('pause') || input.includes('stop')) {
      return {
        speech: "Music paused. Back to the silence of focused work.",
        action: {
          type: 'music',
          payload: { action: 'pause' }
        },
        shouldTTS: true
      };
    }
    
    return {
      speech: "I can play your focus playlists to help you concentrate. What would you like to hear?",
      shouldTTS: true
    };
  }
  
  private static async handleWellnessCommand(input: string): Promise<AssistantResponse> {
    // Mock wellness handling
    if (input.includes('steps')) {
      return {
        speech: "You've taken 8,547 steps today. Just 1,453 more to reach your goal!",
        action: {
          type: 'wellness',
          payload: { action: 'view_steps' }
        },
        shouldTTS: true
      };
    }
    
    if (input.includes('water')) {
      return {
        speech: "You've had 6 cups of water today. Remember to stay hydrated - 2 more cups to go!",
        action: {
          type: 'wellness',
          payload: { action: 'view_water' }
        },
        shouldTTS: true
      };
    }
    
    return {
      speech: "Your wellness metrics look good today. You're 75% of the way to your daily goals.",
      shouldTTS: true
    };
  }
  
  private static async handleGeneralQuery(input: string): Promise<AssistantResponse> {
    // Mock responses for general queries
    const responses = [
      "I'm here to help you stay organized and productive. What can I assist you with?",
      "That's an interesting question. I'm analyzing the best way to help you with that.",
      "I understand. Let me see how I can make your day more efficient.",
      "Absolutely! I'm designed to help you manage your digital workspace seamlessly.",
      "I'm processing that request. My systems are optimized for your productivity needs."
    ];
    
    return {
      speech: responses[Math.floor(Math.random() * responses.length)],
      shouldTTS: true
    };
  }
}
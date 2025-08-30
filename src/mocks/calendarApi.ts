// export interface CalendarEvent {
//   id: string;
//   title: string;
//   description?: string;
//   startTime: Date;
//   endTime: Date;
//   location?: string;
//   attendees?: string[];
//   type: 'meeting' | 'call' | 'event' | 'reminder';
//   status: 'confirmed' | 'tentative' | 'cancelled';
// }

// export class MockCalendarAPI {
//   private static events: CalendarEvent[] = [
//     {
//       id: '1',
//       title: 'Morning Standup',
//       description: 'Daily team sync and progress updates',
//       startTime: new Date('2024-01-05T09:00:00'),
//       endTime: new Date('2024-01-05T09:30:00'),
//       location: 'Conference Room A',
//       attendees: ['team@company.com'],
//       type: 'meeting',
//       status: 'confirmed'
//     },
//     {
//       id: '2',
//       title: 'Client Review',
//       description: 'Quarterly business review with key client',
//       startTime: new Date('2024-01-05T11:00:00'),
//       endTime: new Date('2024-01-05T12:00:00'),
//       location: 'Virtual - Zoom',
//       attendees: ['client@company.com', 'sales@company.com'],
//       type: 'call',
//       status: 'confirmed'
//     },
//     {
//       id: '3',
//       title: 'Design Review',
//       description: 'Review new UI mockups and user flows',
//       startTime: new Date('2024-01-05T14:00:00'),
//       endTime: new Date('2024-01-05T14:45:00'),
//       location: 'Design Studio',
//       attendees: ['design-team@company.com'],
//       type: 'meeting',
//       status: 'confirmed'
//     },
//     {
//       id: '4',
//       title: 'Team Sync',
//       description: 'Weekly all-hands meeting',
//       startTime: new Date('2024-01-05T16:00:00'),
//       endTime: new Date('2024-01-05T16:30:00'),
//       location: 'Main Conference Room',
//       attendees: ['all@company.com'],
//       type: 'meeting',
//       status: 'confirmed'
//     }
//   ];

//   static async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
//     await new Promise(resolve => setTimeout(resolve, 300));
    
//     let filteredEvents = [...this.events];
    
//     if (startDate) {
//       filteredEvents = filteredEvents.filter(event => event.startTime >= startDate);
//     }
    
//     if (endDate) {
//       filteredEvents = filteredEvents.filter(event => event.endTime <= endDate);
//     }
    
//     return filteredEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
//   }

//   static async getTodaysEvents(): Promise<CalendarEvent[]> {
//     const today = new Date();
//     const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
//     return this.getEvents(startOfDay, endOfDay);
//   }

//   static async addEvent(eventData: Partial<CalendarEvent>): Promise<CalendarEvent> {
//     await new Promise(resolve => setTimeout(resolve, 400));
    
//     const newEvent: CalendarEvent = {
//       id: Date.now().toString(),
//       title: eventData.title || 'New Event',
//       description: eventData.description,
//       startTime: eventData.startTime || new Date(),
//       endTime: eventData.endTime || new Date(Date.now() + 60 * 60 * 1000), // 1 hour default
//       location: eventData.location,
//       attendees: eventData.attendees || [],
//       type: eventData.type || 'meeting',
//       status: eventData.status || 'tentative'
//     };

//     this.events.push(newEvent);
//     return newEvent;
//   }

//   static async updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
//     await new Promise(resolve => setTimeout(resolve, 300));
    
//     const eventIndex = this.events.findIndex(event => event.id === id);
//     if (eventIndex === -1) return null;

//     this.events[eventIndex] = { ...this.events[eventIndex], ...updates };
//     return this.events[eventIndex];
//   }

//   static async deleteEvent(id: string): Promise<boolean> {
//     await new Promise(resolve => setTimeout(resolve, 200));
    
//     const eventIndex = this.events.findIndex(event => event.id === id);
//     if (eventIndex === -1) return false;

//     this.events.splice(eventIndex, 1);
//     return true;
//   }

//   static async getNextEvent(): Promise<CalendarEvent | null> {
//     await new Promise(resolve => setTimeout(resolve, 100));
    
//     const now = new Date();
//     const upcomingEvents = this.events
//       .filter(event => event.startTime > now && event.status !== 'cancelled')
//       .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    
//     return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
//   }
// }

// /src/mocks/calendarApi.ts
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees?: string[];
  type: "meeting" | "call" | "event" | "reminder";
  status: "confirmed" | "tentative" | "cancelled";
}

export class MockCalendarAPI {
  private static events: CalendarEvent[] = [
    {
      id: "1",
      title: "Morning Standup",
      description: "Daily team sync and progress updates",
      startTime: new Date("2024-01-05T09:00:00"),
      endTime: new Date("2024-01-05T09:30:00"),
      location: "Conference Room A",
      attendees: ["team@company.com"],
      type: "meeting",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Client Review",
      description: "Quarterly business review with key client",
      startTime: new Date("2024-01-05T11:00:00"),
      endTime: new Date("2024-01-05T12:00:00"),
      location: "Virtual - Zoom",
      attendees: ["client@company.com", "sales@company.com"],
      type: "call",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Design Review",
      description: "Review new UI mockups and user flows",
      startTime: new Date("2024-01-05T14:00:00"),
      endTime: new Date("2024-01-05T14:45:00"),
      location: "Design Studio",
      attendees: ["design-team@company.com"],
      type: "meeting",
      status: "confirmed",
    },
    {
      id: "4",
      title: "Team Sync",
      description: "Weekly all-hands meeting",
      startTime: new Date("2024-01-05T16:00:00"),
      endTime: new Date("2024-01-05T16:30:00"),
      location: "Main Conference Room",
      attendees: ["all@company.com"],
      type: "meeting",
      status: "confirmed",
    },
  ];

  private static cloneEvents(events: CalendarEvent[]): CalendarEvent[] {
    return events.map((e) => ({
      ...e,
      startTime: new Date(e.startTime),
      endTime: new Date(e.endTime),
    }));
  }

  static async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredEvents = this.cloneEvents(this.events);

    if (startDate) {
      filteredEvents = filteredEvents.filter((event) => event.startTime >= startDate);
    }

    if (endDate) {
      filteredEvents = filteredEvents.filter((event) => event.endTime <= endDate);
    }

    return filteredEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  static async getTodaysEvents(): Promise<CalendarEvent[]> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    return this.getEvents(startOfDay, endOfDay);
  }

  static async addEvent(eventData: Partial<CalendarEvent>): Promise<CalendarEvent> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title ?? "New Event",
      description: eventData.description,
      startTime: eventData.startTime ?? new Date(),
      endTime: eventData.endTime ?? new Date(Date.now() + 60 * 60 * 1000), // default 1h
      location: eventData.location,
      attendees: eventData.attendees ?? [],
      type: eventData.type ?? "meeting",
      status: eventData.status ?? "tentative",
    };

    this.events.push(newEvent);
    return { ...newEvent };
  }

  static async updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const eventIndex = this.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) return null;

    this.events[eventIndex] = { ...this.events[eventIndex], ...updates };
    return { ...this.events[eventIndex] };
  }

  static async deleteEvent(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const eventIndex = this.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) return false;

    this.events.splice(eventIndex, 1);
    return true;
  }

  static async getNextEvent(): Promise<CalendarEvent | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const now = new Date();
    const upcomingEvents = this.events
      .filter((event) => event.startTime > now && event.status !== "cancelled")
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    return upcomingEvents.length > 0 ? { ...upcomingEvents[0] } : null;
  }
}

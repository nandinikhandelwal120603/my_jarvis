export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  category: string;
}

export class MockTasksAPI {
  private static tasks: Task[] = [
    {
      id: '1',
      title: 'Review quarterly reports',
      description: 'Analyze Q3 performance metrics and prepare summary',
      completed: false,
      priority: 'high',
      createdAt: new Date('2024-01-01'),
      dueDate: new Date('2024-01-05'),
      category: 'work'
    },
    {
      id: '2',
      title: 'Schedule team meeting',
      description: 'Set up weekly sync with development team',
      completed: false,
      priority: 'medium',
      createdAt: new Date('2024-01-02'),
      category: 'meetings'
    },
    {
      id: '3',
      title: 'Update project documentation',
      description: 'Refresh API docs and user guides',
      completed: false,
      priority: 'medium',
      createdAt: new Date('2024-01-03'),
      category: 'documentation'
    },
    {
      id: '4',
      title: 'Prepare presentation slides',
      description: 'Create slides for client presentation',
      completed: false,
      priority: 'high',
      createdAt: new Date('2024-01-04'),
      dueDate: new Date('2024-01-06'),
      category: 'presentation'
    }
  ];

  static async getTasks(): Promise<Task[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.tasks];
  }

  static async addTask(taskData: Partial<Task>): Promise<Task> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || 'New Task',
      description: taskData.description,
      completed: false,
      priority: taskData.priority || 'medium',
      createdAt: new Date(),
      dueDate: taskData.dueDate,
      category: taskData.category || 'general'
    };

    this.tasks.push(newTask);
    return newTask;
  }

  static async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
    return this.tasks[taskIndex];
  }

  static async deleteTask(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  static async completeTask(id: string): Promise<Task | null> {
    return this.updateTask(id, { completed: true });
  }

  static async getTasksByCategory(category: string): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.tasks.filter(task => task.category === category);
  }

  static async getTasksByPriority(priority: 'low' | 'medium' | 'high'): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.tasks.filter(task => task.priority === priority);
  }
}
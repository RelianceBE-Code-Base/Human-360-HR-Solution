export interface IGoal {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'At Risk' | 'Completed';
  keyResults: string[];
  alignment: string;
}

export interface IGoalsObjectivesState {
  currentView: 'dashboard' | 'form';
  goals: IGoal[];
  selectedGoal: IGoal | null;
  editMode: boolean;
}
import * as React from 'react';
import styles from './GoalsObjectives.module.scss';
import { IGoalsObjectivesProps } from './IGoalsObjectivesProps';
import { IGoalsObjectivesState, IGoal } from './IGoalsObjectivesState';
import GoalsDashboard from './GoalsDashboard';
import GoalForm from './GoalForm';

export default class GoalsObjectives extends React.Component<IGoalsObjectivesProps, IGoalsObjectivesState> {
  constructor(props: IGoalsObjectivesProps) {
    super(props);
    
    this.state = {
      currentView: 'dashboard',
      goals: [
        {
          id: '1',
          title: 'Implement new reporting dashboard',
          description: 'Design and implement a new reporting dashboard with improved data visualization capabilities. The dashboard should include key metrics, trend analysis, and customizable views.',
          dueDate: new Date('2025-07-30'),
          priority: 'High',
          category: 'Technical',
          progress: 75,
          status: 'In Progress',
          keyResults: [],
          alignment: 'Q2 Goal'
        },
        {
          id: '2',
          title: 'Complete leadership training program',
          description: 'Complete the 6-week leadership training program, including all modules, assessments, and the final project presentation. Focus on developing team management and strategic thinking skills.',
          dueDate: new Date('2025-08-15'),
          priority: 'Medium',
          category: 'Development',
          progress: 40,
          status: 'In Progress',
          keyResults: [],
          alignment: 'Q2 Goal'
        }
      ],
      selectedGoal: null,
      editMode: false
    };
  }

  private handleAddGoal = (): void => {
    this.setState({
      currentView: 'form',
      selectedGoal: null,
      editMode: false
    });
  }

  private handleEditGoal = (goal: IGoal): void => {
    this.setState({
      currentView: 'form',
      selectedGoal: goal,
      editMode: true
    });
  }

  private handleSaveGoal = (goal: IGoal): void => {
    const { goals, editMode } = this.state;
    
    if (editMode) {
      const updatedGoals = goals.map(g => g.id === goal.id ? goal : g);
      this.setState({
        goals: updatedGoals,
        currentView: 'dashboard',
        selectedGoal: null,
        editMode: false
      });
    } else {
      const newGoal: IGoal = {
        ...goal,
        id: Date.now().toString(),
        progress: 0,
        status: 'Not Started'
      };
      this.setState({
        goals: [...goals, newGoal],
        currentView: 'dashboard',
        selectedGoal: null,
        editMode: false
      });
    }
  }

  private handleCancel = (): void => {
    this.setState({
      currentView: 'dashboard',
      selectedGoal: null,
      editMode: false
    });
  }

  public render(): React.ReactElement<IGoalsObjectivesProps> {
    const { currentView, goals, selectedGoal, editMode } = this.state;

    return (
      <div className={styles.goalsObjectives}>
        {currentView === 'dashboard' ? (
          <GoalsDashboard
            goals={goals}
            onAddGoal={this.handleAddGoal}
            onEditGoal={this.handleEditGoal}
          />
        ) : (
          <GoalForm
            goal={selectedGoal}
            editMode={editMode}
            onSave={this.handleSaveGoal}
            onCancel={this.handleCancel}
          />
        )}
      </div>
    );
  }
}
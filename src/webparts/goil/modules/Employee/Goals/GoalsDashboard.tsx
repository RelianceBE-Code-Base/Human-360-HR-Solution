import * as React from 'react';
import styles from './GoalsObjectives.module.scss';
import { IGoal } from './IGoalsObjectivesState';

export interface IGoalsDashboardProps {
  goals: IGoal[];
  onAddGoal: () => void;
  onEditGoal: (goal: IGoal) => void;
}

const GoalsDashboard: React.FC<IGoalsDashboardProps> = ({ goals, onAddGoal, onEditGoal }) => {
  const activeGoals = goals.filter(g => g.status !== 'Completed');
  const completedGoals = goals.filter(g => g.status === 'Completed');
  const completionRate = goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0;

  const getStatusCounts = () => {
    const completed = goals.filter(g => g.status === 'Completed').length;
    const inProgress = goals.filter(g => g.status === 'In Progress').length;
    const atRisk = goals.filter(g => g.status === 'At Risk').length;
    const notStarted = goals.filter(g => g.status === 'Not Started').length;
    const total = goals.length;

    return {
      completed: (completed / total) * 100,
      inProgress: (inProgress / total) * 100,
      atRisk: (atRisk / total) * 100,
      notStarted: (notStarted / total) * 100
    };
  };

  const statusCounts = getStatusCounts();
  const getDaysLeft = (dueDate: Date): string => {
    const today = new Date();
    const diff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return `${diff} days left`;
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Goals & Objectives</h1>
          <p className={styles.subtitle}>Set, track, and achieve your performance goals.</p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#E3F2FD' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#2196F3" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" fill="#2196F3"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Active Goals</div>
            <div className={styles.statValue}>{activeGoals.length}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#E0F2F1' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#00BFA5"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Completed Goals</div>
            <div className={styles.statValue}>{completedGoals.length}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#F3E5F5' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#9C27B0"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Completion Rate</div>
            <div className={styles.statValue}>{completionRate}%</div>
          </div>
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2>Goal Progress</h2>
          <select className={styles.quarterSelect}>
            <option>Q1 2025</option>
            <option>Q2 2025</option>
            <option selected>Q1 2025</option>
            <option>Q4 2024</option>
          </select>
        </div>
        <div className={styles.chartContainer}>
          <svg viewBox="0 0 200 200" className={styles.pieChart}>
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#00BFA5"
              strokeWidth="40"
              strokeDasharray={`${statusCounts.completed * 5.03} 502.4`}
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#FFA726"
              strokeWidth="40"
              strokeDasharray={`${statusCounts.inProgress * 5.03} 502.4`}
              strokeDashoffset={`-${statusCounts.completed * 5.03}`}
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#EF5350"
              strokeWidth="40"
              strokeDasharray={`${statusCounts.atRisk * 5.03} 502.4`}
              strokeDashoffset={`-${(statusCounts.completed + statusCounts.inProgress) * 5.03}`}
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#BDBDBD"
              strokeWidth="40"
              strokeDasharray={`${statusCounts.notStarted * 5.03} 502.4`}
              strokeDashoffset={`-${(statusCounts.completed + statusCounts.inProgress + statusCounts.atRisk) * 5.03}`}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: '#00BFA5' }}></span>
              <span>Completed</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: '#FFA726' }}></span>
              <span>In Progress</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: '#EF5350' }}></span>
              <span>At Risk</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: '#BDBDBD' }}></span>
              <span>Not Started</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.goalsSection}>
        <div className={styles.goalsSectionHeader}>
          <h2>Active Goals</h2>
          <button className={styles.addButton} onClick={onAddGoal}>
            + Add Goal
          </button>
        </div>

        <div className={styles.goalsList}>
          {activeGoals.map((goal) => (
            <div key={goal.id} className={styles.goalCard}>
              <div className={styles.goalHeader}>
                <div>
                  <h3 className={styles.goalTitle}>{goal.title}</h3>
                  <p className={styles.goalDueDate}>Due on {goal.dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <span className={styles.goalStatus}>{goal.status}</span>
              </div>

              <div className={styles.goalProgress}>
                <div className={styles.progressHeader}>
                  <span>Progress: {goal.progress}%</span>
                  <span>{getDaysLeft(goal.dueDate)}</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className={styles.goalTags}>
                <span className={`${styles.tag} ${styles.tagCategory}`}>{goal.category}</span>
                <span className={`${styles.tag} ${styles.tagPriority}`}>{goal.priority} Priority</span>
                <span className={`${styles.tag} ${styles.tagAlignment}`}>{goal.alignment}</span>
              </div>

              <div className={styles.goalDescription}>
                <h4>Description</h4>
                <p>{goal.description}</p>
              </div>

              <div className={styles.goalActions}>
                <button className={styles.editButton} onClick={() => onEditGoal(goal)}>
                  Edit
                </button>
                <button className={styles.updateButton} onClick={() => onEditGoal(goal)}>
                  Update Progress
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsDashboard;
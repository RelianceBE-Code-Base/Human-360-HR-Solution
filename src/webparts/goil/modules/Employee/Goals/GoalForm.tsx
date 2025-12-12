import * as React from 'react';
import styles from './GoalsObjectives.module.scss';
import { IGoal } from './IGoalsObjectivesState';

export interface IGoalFormProps {
  goal: IGoal | null;
  editMode: boolean;
  onSave: (goal: IGoal) => void;
  onCancel: () => void;
}

const GoalForm: React.FC<IGoalFormProps> = ({ goal, editMode, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState<IGoal>({
    id: goal?.id || '',
    title: goal?.title || '',
    description: goal?.description || '',
    dueDate: goal?.dueDate || new Date(),
    priority: goal?.priority || 'High',
    category: goal?.category || 'Technical',
    progress: goal?.progress || 0,
    status: goal?.status || 'Not Started',
    keyResults: goal?.keyResults || [],
    alignment: goal?.alignment || ''
  });

  const handleChange = (field: string, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (): void => {
    onSave(formData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h1>{editMode ? 'Edit Goal' : 'Create New Goal'}</h1>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Goal Title</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter goal title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <textarea
            className={styles.formTextarea}
            placeholder="Describe your goal in detail..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Due Date</label>
            <input
              type="date"
              className={styles.formInput}
              value={formData.dueDate.toISOString().split('T')[0]}
              onChange={(e) => handleChange('dueDate', new Date(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Priority</label>
            <select
              className={styles.formSelect}
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Category</label>
          <select
            className={styles.formSelect}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="Technical">Technical</option>
            <option value="Development">Development</option>
            <option value="Leadership">Leadership</option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        {editMode && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Progress (%)</label>
            <input
              type="number"
              className={styles.formInput}
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
            />
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${formData.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {editMode && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Status</label>
            <select
              className={styles.formSelect}
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Key Results/Metrics</label>
          <div className={styles.keyResultsInput}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Add measurable result"
            />
            <button className={styles.addKeyResultButton}>+</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Alignment</label>
          <select
            className={styles.formSelect}
            value={formData.alignment}
            onChange={(e) => handleChange('alignment', e.target.value)}
          >
            <option value="">Select team/company objective</option>
            <option value="Q1 Goal">Q1 Goal</option>
            <option value="Q2 Goal">Q2 Goal</option>
            <option value="Q3 Goal">Q3 Goal</option>
            <option value="Q4 Goal">Q4 Goal</option>
            <option value="Annual Objective">Annual Objective</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.createButton} onClick={handleSubmit}>
            {editMode ? 'Save Changes' : 'Create Goal'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalForm;
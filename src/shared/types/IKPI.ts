/**
 * Represents a single Key Performance Indicator (KPI) entry.
 *
 * @property {number} id - Unique identifier for the KPI.
 * @property {string} indicator - The KPI indicator or metric being measured.
 * @property {string} department - Department responsible for the KPI.
 * @property {string} objective - What the KPI aims to achieve.
 * @property {string} target - The expected performance target.
 * @property {string} status - Current status of the KPI (e.g., "On Track", "Delayed").
 * @property {string} activities - Key activities or actions contributing to the KPI.
 * @property {string} verification - Means of verification or evidence for progress.
 * @property {number} progress - Percentage of completion (0–100).
 * @property {number} budget - Allocated budget for the KPI.
 * @property {string} frequency - Reporting frequency (e.g., "Monthly", "Quarterly").
 * @property {string} comments - Additional notes or relevant context.
 * @property {string} timelineStart - Start date of the KPI timeline (ISO date string).
 * @property {string} timelineEnd - End date of the KPI timeline (ISO date string).
 */
export interface IKPI {
  id: number;
  indicator: string;
  department: string;
  objective: string;
  target: string;
  // baseline: string;
  status: string;
  activities: string;
  verification: string;
  progress: number;
  budget: number;
  frequency: string;
  comments: string;
  timelineStart: string;
  timelineEnd: string;
}

// types/KPI.ts (or wherever your types are defined)
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

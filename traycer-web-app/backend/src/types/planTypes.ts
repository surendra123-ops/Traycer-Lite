export interface Plan {
  Frontend: string[];
  Backend: string[];
  Database: string[];
  Notes?: string;
}

export interface PlanRequest {
  idea: string;
  mode: 'rule' | 'ai';
}

export interface PlanResponse {
  plan: Plan;
  mode: 'rule' | 'ai';
  timestamp: number;
  id?: string;
}

export type PlanningMode = 'rule' | 'ai';

export interface SavedPlan {
  _id?: string;
  idea: string;
  plan: Plan;
  mode: PlanningMode;
  createdAt: Date;
  updatedAt: Date;
}

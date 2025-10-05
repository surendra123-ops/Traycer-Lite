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
}
export type PlanningMode = 'rule' | 'ai';
//# sourceMappingURL=planTypes.d.ts.map
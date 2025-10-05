import { PlanResponse } from '../../types/planTypes';
export declare class PlanModel {
    private currentPlan;
    private planHistory;
    setCurrentPlan(plan: PlanResponse): void;
    getCurrentPlan(): PlanResponse | null;
    getPlanHistory(): PlanResponse[];
    exportToJSON(): string;
    exportToMarkdown(): string;
}
//# sourceMappingURL=planModel.d.ts.map
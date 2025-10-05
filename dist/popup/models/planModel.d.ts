import { PlanResponse } from '../../types/planTypes';
export declare class PlanModel {
    private currentPlan;
    private planHistory;
    setCurrentPlan(plan: PlanResponse): void;
    getCurrentPlan(): PlanResponse | null;
    getPlanHistory(): PlanResponse[];
}
//# sourceMappingURL=planModel.d.ts.map
import { PlanResponse } from '../../types/planTypes';
import { PlanModel } from '../models/planModel';
export declare class PlanController {
    private model;
    constructor(model: PlanModel);
    generatePlan(idea: string, mode: 'rule' | 'ai'): Promise<PlanResponse>;
    getCurrentPlan(): PlanResponse | null;
    getPlanHistory(): PlanResponse[];
    copyToClipboard(format: 'json' | 'markdown'): Promise<void>;
}
//# sourceMappingURL=planController.d.ts.map
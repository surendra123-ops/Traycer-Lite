import { Plan, PlanResponse } from '../../types/planTypes';

export class PlanModel {
  private currentPlan: PlanResponse | null = null;
  private planHistory: PlanResponse[] = [];

  setCurrentPlan(plan: PlanResponse): void {
    this.currentPlan = plan;
    this.planHistory.unshift(plan);
    
    // Keep only last 10 plans
    if (this.planHistory.length > 10) {
      this.planHistory = this.planHistory.slice(0, 10);
    }
  }

  getCurrentPlan(): PlanResponse | null {
    return this.currentPlan;
  }

  getPlanHistory(): PlanResponse[] {
    return this.planHistory;
  }
}

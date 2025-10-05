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

  exportToJSON(): string {
    return JSON.stringify(this.currentPlan, null, 2);
  }

  exportToMarkdown(): string {
    if (!this.currentPlan) return '';
    
    const { plan } = this.currentPlan;
    let markdown = `# Project Plan\n\n`;
    
    markdown += `## Frontend\n`;
    plan.Frontend.forEach(task => {
      markdown += `- ${task}\n`;
    });
    
    markdown += `\n## Backend\n`;
    plan.Backend.forEach(task => {
      markdown += `- ${task}\n`;
    });
    
    markdown += `\n## Database\n`;
    plan.Database.forEach(task => {
      markdown += `- ${task}\n`;
    });
    
    if (plan.Notes) {
      markdown += `\n## Notes\n${plan.Notes}\n`;
    }
    
    return markdown;
  }
}

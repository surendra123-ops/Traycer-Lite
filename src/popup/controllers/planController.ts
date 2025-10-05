import { PlanRequest, PlanResponse } from '../../types/planTypes';
import { PlanModel } from '../models/planModel';

export class PlanController {
  private model: PlanModel;

  constructor(model: PlanModel) {
    this.model = model;
  }

  async generatePlan(idea: string, mode: 'rule' | 'ai'): Promise<PlanResponse> {
    const request: PlanRequest = { idea, mode };
    
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(request, (response: PlanResponse) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          this.model.setCurrentPlan(response);
          resolve(response);
        }
      });
    });
  }

  getCurrentPlan(): PlanResponse | null {
    return this.model.getCurrentPlan();
  }

  getPlanHistory(): PlanResponse[] {
    return this.model.getPlanHistory();
  }

  copyToClipboard(format: 'json' | 'markdown'): Promise<void> {
    const text = format === 'json' 
      ? this.model.exportToJSON()
      : this.model.exportToMarkdown();
    
    return navigator.clipboard.writeText(text);
  }
}

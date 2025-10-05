import axios from 'axios';
import { PlanRequest, PlanResponse, SavedPlan } from '../types/planTypes';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-name.onrender.com' 
  : 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planService = {
  async generatePlan(idea: string, mode: 'rule' | 'ai'): Promise<PlanResponse> {
    const request: PlanRequest = { idea, mode };
    const response = await api.post('/api/plans/generate', request);
    return response.data;
  },

  async savePlan(plan: PlanResponse): Promise<void> {
    await api.post('/api/plans/save', {
      idea: plan.plan.Notes || 'Generated plan',
      plan: plan.plan,
      mode: plan.mode
    });
  },

  async getSavedPlans(): Promise<SavedPlan[]> {
    const response = await api.get('/api/plans/saved');
    return response.data;
  },

  async deletePlan(id: string): Promise<void> {
    await api.delete(`/api/plans/saved/${id}`);
  }
};

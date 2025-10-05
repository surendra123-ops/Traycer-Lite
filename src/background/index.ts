import { PlanRequest, PlanResponse } from '../types/planTypes';
import { generateRuleBasedPlan } from './mode1Planner';
import { generateAIPlan } from './mode2Planner';

chrome.runtime.onMessage.addListener((request: PlanRequest, sender, sendResponse) => {
  if (request.idea && request.mode) {
    handlePlanGeneration(request)
      .then((response: PlanResponse) => {
        sendResponse(response);
      })
      .catch((error) => {
        console.error('Plan generation error:', error);
        sendResponse({
          plan: {
            Frontend: ['Error occurred'],
            Backend: ['Please try again'],
            Database: ['Check your connection']
          },
          mode: request.mode,
          timestamp: Date.now()
        });
      });
    
    return true; // Keep message channel open for async response
  }
});

async function handlePlanGeneration(request: PlanRequest): Promise<PlanResponse> {
  const startTime = Date.now();
  
  let plan;
  if (request.mode === 'rule') {
    plan = generateRuleBasedPlan(request.idea);
  } else {
    plan = await generateAIPlan(request.idea);
  }
  
  return {
    plan,
    mode: request.mode,
    timestamp: startTime
  };
}

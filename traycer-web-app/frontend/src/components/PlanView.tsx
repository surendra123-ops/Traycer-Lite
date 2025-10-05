import React from 'react';
import { PlanResponse } from '../types/planTypes';

interface PlanViewProps {
  plan: PlanResponse | null;
}

export const PlanView: React.FC<PlanViewProps> = ({ plan }) => {
  if (!plan) {
    return null;
  }

  const { plan: planData, mode } = plan;

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Frontend</h4>
        <ul className="space-y-1">
          {planData.Frontend.map((task: string, index: number) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Backend</h4>
        <ul className="space-y-1">
          {planData.Backend.map((task: string, index: number) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Database</h4>
        <ul className="space-y-1">
          {planData.Database.map((task: string, index: number) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      {planData.Notes && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
            {planData.Notes}
          </p>
        </div>
      )}
    </div>
  );
};

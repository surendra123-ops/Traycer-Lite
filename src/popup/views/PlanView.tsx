import React from 'react';
import { PlanResponse } from '../../types/planTypes';

interface PlanViewProps {
  plan: PlanResponse | null;
}

export const PlanView: React.FC<PlanViewProps> = ({ plan }) => {
  if (!plan) {
    return null;
  }

  const { plan: planData, mode } = plan;

  return (
    <div className="border border-gray-200 rounded-md">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Plan</h3>
          <span className="text-xs text-gray-500">
            {mode === 'rule' ? 'Rule-based' : 'AI-powered'}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Frontend</h4>
          <ul className="space-y-1">
            {planData.Frontend.map((task, index) => (
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
            {planData.Backend.map((task, index) => (
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
            {planData.Database.map((task, index) => (
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
    </div>
  );
};

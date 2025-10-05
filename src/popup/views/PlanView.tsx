import React from 'react';
import { PlanResponse } from '../../types/planTypes';

interface PlanViewProps {
  plan: PlanResponse | null;
  onCopy: (format: 'json' | 'markdown') => void;
}

export const PlanView: React.FC<PlanViewProps> = ({ plan, onCopy }) => {
  if (!plan) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Enter a project idea above to generate a plan</p>
      </div>
    );
  }

  const { plan: planData, mode } = plan;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Generated Plan</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          mode === 'rule' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {mode === 'rule' ? 'Mode 1' : 'Mode 2'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Frontend</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {planData.Frontend.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Backend</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {planData.Backend.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Database</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {planData.Database.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>

        {planData.Notes && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Notes</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {planData.Notes}
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-2 pt-4 border-t">
        <button
          onClick={() => onCopy('markdown')}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Copy Markdown
        </button>
        <button
          onClick={() => onCopy('json')}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Copy JSON
        </button>
      </div>
    </div>
  );
};

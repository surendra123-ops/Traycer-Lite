import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { InputForm } from './views/InputForm';
import { PlanView } from './views/PlanView';
import { PlanController } from './controllers/planController';
import { PlanModel } from './models/planModel';
import { PlanResponse } from '../types/planTypes';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const model = new PlanModel();
  const controller = new PlanController(model);

  const handleGenerate = async (idea: string, mode: 'rule' | 'ai') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await controller.generatePlan(idea, mode);
      setCurrentPlan(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (format: 'json' | 'markdown') => {
    try {
      await controller.copyToClipboard(format);
      // Could add a toast notification here
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="w-96 p-4 bg-white">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">Traycer Lite</h1>
        <p className="text-sm text-gray-600">Convert ideas into structured plans</p>
      </div>

      <InputForm onGenerate={handleGenerate} isLoading={isLoading} />

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <PlanView plan={currentPlan} onCopy={handleCopy} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

import React, { useState } from 'react';
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

  const handleGenerate = async (idea: string, mode: 'rule' | 'ai'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await controller.generatePlan(idea, mode);
      setCurrentPlan(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err; // Re-throw so InputForm knows generation failed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">Traycer Lite</h1>
      </div>

      <div className="p-4 space-y-4">
        <InputForm onGenerate={handleGenerate} isLoading={isLoading} />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <PlanView plan={currentPlan} />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

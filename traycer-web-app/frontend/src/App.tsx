import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InputForm } from './components/InputForm';
import { PlanView } from './components/PlanView';
import { SavedPlans } from './components/SavedPlans';
import { Navigation } from './components/Navigation';
import { PlanResponse } from '../shared/types/planTypes';
import { planService } from './services/planService';
import './App.css';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<PlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (idea: string, mode: 'rule' | 'ai'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await planService.generatePlan(idea, mode);
      setCurrentPlan(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = async (plan: PlanResponse) => {
    try {
      await planService.savePlan(plan);
      alert('Plan saved successfully!');
    } catch (error) {
      console.error('Failed to save plan:', error);
      alert('Failed to save plan');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Traycer Lite
              </h1>
              <p className="text-lg text-gray-600">
                Convert your project ideas into structured software development plans
              </p>
            </div>

            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  {currentPlan && (
                    <div className="bg-white rounded-lg shadow-md">
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">Generated Plan</h2>
                        <div className="flex space-x-2">
                          <span className="text-sm text-gray-500">
                            {currentPlan.mode === 'rule' ? 'Rule-based' : 'AI-powered'}
                          </span>
                          <button
                            onClick={() => handleSavePlan(currentPlan)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Save Plan
                          </button>
                        </div>
                      </div>
                      <PlanView plan={currentPlan} />
                    </div>
                  )}
                </div>
              } />
              
              <Route path="/saved" element={<SavedPlans />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;

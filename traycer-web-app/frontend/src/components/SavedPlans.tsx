import React, { useState, useEffect } from 'react';
import { SavedPlan } from '../types/planTypes';
import { planService } from '../services/planService';

export const SavedPlans: React.FC = () => {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const savedPlans = await planService.getSavedPlans();
      setPlans(savedPlans);
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await planService.deletePlan(id);
        setPlans(plans.filter(plan => plan._id !== id));
      } catch (error) {
        console.error('Failed to delete plan:', error);
        alert('Failed to delete plan');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading saved plans...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Saved Plans</h2>
      
      {plans.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No saved plans yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {plans.map((plan) => (
            <div key={plan._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.idea}</h3>
                  <p className="text-sm text-gray-500">
                    {plan.mode === 'rule' ? 'Rule-based' : 'AI-powered'} • 
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(plan._id!)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Frontend</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.plan.Frontend.map((task, index) => (
                      <li key={index}>• {task}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Backend</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.plan.Backend.map((task, index) => (
                      <li key={index}>• {task}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Database</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.plan.Database.map((task, index) => (
                      <li key={index}>• {task}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {plan.plan.Notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-gray-700 mb-1">Notes</h4>
                  <p className="text-sm text-gray-600">{plan.plan.Notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

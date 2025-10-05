import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (idea: string, mode: 'rule' | 'ai') => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState<'rule' | 'ai'>('rule');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      try {
        await onGenerate(idea.trim(), mode);
        setIdea('');
      } catch (error) {
        console.error('Generation failed:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
          Project Idea
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your project idea..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mode
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="rule"
              checked={mode === 'rule'}
              onChange={(e) => setMode(e.target.value as 'rule' | 'ai')}
              disabled={isLoading}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Rule-based</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="ai"
              checked={mode === 'ai'}
              onChange={(e) => setMode(e.target.value as 'rule' | 'ai')}
              disabled={isLoading}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">AI-powered</span>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !idea.trim()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Plan'}
      </button>
    </form>
  );
};

import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (idea: string, mode: 'rule' | 'ai') => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState<'rule' | 'ai'>('rule');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onGenerate(idea.trim(), mode);
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
          placeholder="Describe your project idea (e.g., 'Chat app with file sharing')"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-2">
          Planning Mode
        </label>
        <select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'rule' | 'ai')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        >
          <option value="rule">Mode 1: Offline Rule-Based</option>
          <option value="ai">Mode 2: AI-Powered (Gemini)</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !idea.trim()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating Plan...' : 'Generate Plan'}
      </button>
    </form>
  );
};

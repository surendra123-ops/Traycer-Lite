import { Plan } from '../types/planTypes';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

function createSmartPrompt(userInput: string): string {
  return `You are a senior software architect with 20+ years of experience.
Break the user request into Frontend, Backend, and Database components.
Use bullet points under each section for clarity.
Add a short, plain-English explanation in a "Notes" section for non-technical users.
Keep the plan concise, clear, and easy to understand.
Format your response exactly like this:

--- Frontend ---
- [task 1]
- [task 2]

--- Backend ---
- [task 1]
- [task 2]

--- Database ---
- [table/entity 1]
- [table/entity 2]

--- Notes ---
[Plain English explanation of what this system does and how the components work together]

User request: "${userInput}"`;
}

function parseAIResponse(responseText: string): Plan {
  const lines = responseText.split('\n');
  const plan: Plan = {
    Frontend: [],
    Backend: [],
    Database: [],
    Notes: ''
  };

  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('--- Frontend ---')) {
      currentSection = 'frontend';
    } else if (trimmedLine.startsWith('--- Backend ---')) {
      currentSection = 'backend';
    } else if (trimmedLine.startsWith('--- Database ---')) {
      currentSection = 'database';
    } else if (trimmedLine.startsWith('--- Notes ---')) {
      currentSection = 'notes';
    } else if (trimmedLine.startsWith('- ') && currentSection !== 'notes') {
      const task = trimmedLine.substring(2).trim();
      if (currentSection === 'frontend') {
        plan.Frontend.push(task);
      } else if (currentSection === 'backend') {
        plan.Backend.push(task);
      } else if (currentSection === 'database') {
        plan.Database.push(task);
      }
    } else if (currentSection === 'notes' && trimmedLine && !trimmedLine.startsWith('---')) {
      plan.Notes = (plan.Notes + ' ' + trimmedLine).trim();
    }
  }

  return plan;
}

export async function generateAIPlan(idea: string): Promise<Plan> {
  try {
    const prompt = createSmartPrompt(idea);
    
    const requestBody: GeminiRequest = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from AI');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    return parseAIResponse(responseText);
    
  } catch (error) {
    console.error('AI planning error:', error);
    // Fallback to rule-based plan if AI fails
    const { generateRuleBasedPlan } = await import('./mode1Planner');
    return generateRuleBasedPlan(idea);
  }
}

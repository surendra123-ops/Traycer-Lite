import { Plan, PlanRequest } from '../types/planTypes';

// Rule-based planning (same logic as extension)
const keywordMappings = [
  {
    keywords: ['chat', 'messaging', 'message', 'conversation'],
    plan: {
      Frontend: ['Chat Interface', 'User Login', 'Message Input', 'User List'],
      Backend: ['Authentication API', 'Message API', 'WebSocket Service', 'User Management'],
      Database: ['Users', 'Messages', 'Chat Rooms', 'User Sessions']
    }
  },
  {
    keywords: ['dashboard', 'analytics', 'metrics', 'chart'],
    plan: {
      Frontend: ['Dashboard Layout', 'Charts & Graphs', 'Filters', 'Data Tables'],
      Backend: ['Data Aggregation API', 'Analytics Service', 'Export API'],
      Database: ['Metrics', 'User Data', 'Analytics Events']
    }
  },
  {
    keywords: ['ecommerce', 'shop', 'store', 'cart', 'payment'],
    plan: {
      Frontend: ['Product Catalog', 'Shopping Cart', 'Checkout Flow', 'User Account'],
      Backend: ['Product API', 'Payment Gateway', 'Order Management', 'Inventory API'],
      Database: ['Products', 'Orders', 'Users', 'Payments', 'Inventory']
    }
  },
  {
    keywords: ['social', 'network', 'friends', 'profile', 'feed'],
    plan: {
      Frontend: ['User Profiles', 'Social Feed', 'Friend Connections', 'Messaging'],
      Backend: ['User API', 'Feed API', 'Social Graph Service', 'Notification Service'],
      Database: ['Users', 'Posts', 'Friendships', 'Notifications']
    }
  },
  {
    keywords: ['game', 'gaming', 'player', 'score', 'leaderboard'],
    plan: {
      Frontend: ['Game Interface', 'Player Dashboard', 'Leaderboard', 'Game Controls'],
      Backend: ['Game Logic API', 'Score API', 'Multiplayer Service'],
      Database: ['Players', 'Games', 'Scores', 'Achievements']
    }
  },
  {
    keywords: ['ai', 'machine learning', 'ml', 'prediction', 'model'],
    plan: {
      Frontend: ['AI Interface', 'Data Input Forms', 'Results Display', 'Model Configuration'],
      Backend: ['AI Service API', 'Model Training API', 'Prediction API', 'Data Processing'],
      Database: ['Training Data', 'Models', 'Predictions', 'User Inputs']
    }
  }
];

const fallbackPlan: Plan = {
  Frontend: ['Basic UI/Homepage', 'Navigation', 'User Interface Components'],
  Backend: ['Core Logic API', 'Authentication', 'Data Processing'],
  Database: ['Generic Data Storage', 'User Data', 'Application Data']
};

export function generateRuleBasedPlan(idea: string): Plan {
  const lowercaseIdea = idea.toLowerCase();
  
  for (const mapping of keywordMappings) {
    const hasKeyword = mapping.keywords.some(keyword => 
      lowercaseIdea.includes(keyword)
    );
    
    if (hasKeyword) {
      return mapping.plan;
    }
  }
  
  return fallbackPlan;
}

// Define the Gemini API response interface
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function generateAIPlan(idea: string): Promise<Plan> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_ACTUAL_GEMINI_API_KEY_HERE') {
    console.log('Gemini API key not set, falling back to rule-based planning');
    return generateRuleBasedPlan(idea);
  }

  try {
    const prompt = `You are a senior software architect with 20+ years of experience.
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

User request: "${idea}"`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
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
    return generateRuleBasedPlan(idea);
  }
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

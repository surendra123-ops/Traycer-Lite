import { Plan } from '../types/planTypes';

interface KeywordMapping {
  keywords: string[];
  plan: Plan;
}

const keywordMappings: KeywordMapping[] = [
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
  
  // Find matching keyword mapping
  for (const mapping of keywordMappings) {
    const hasKeyword = mapping.keywords.some(keyword => 
      lowercaseIdea.includes(keyword)
    );
    
    if (hasKeyword) {
      return mapping.plan;
    }
  }
  
  // Return fallback plan for unknown input
  return fallbackPlan;
}

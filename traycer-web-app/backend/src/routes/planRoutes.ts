import express from 'express';
import { generateRuleBasedPlan, generateAIPlan } from '../services/planningService';
import Plan from '../models/Plan';
import { PlanRequest, PlanResponse } from '../../shared/types/planTypes';

const router = express.Router();

// Generate plan
router.post('/generate', async (req, res) => {
  try {
    const { idea, mode }: PlanRequest = req.body;

    if (!idea || !mode) {
      return res.status(400).json({ error: 'Idea and mode are required' });
    }

    const startTime = Date.now();
    let plan;

    if (mode === 'rule') {
      plan = generateRuleBasedPlan(idea);
    } else {
      plan = await generateAIPlan(idea);
    }

    const response: PlanResponse = {
      plan,
      mode,
      timestamp: startTime
    };

    res.json(response);
  } catch (error) {
    console.error('Plan generation error:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

// Save plan
router.post('/save', async (req, res) => {
  try {
    const { idea, plan, mode } = req.body;

    if (!idea || !plan || !mode) {
      return res.status(400).json({ error: 'Idea, plan, and mode are required' });
    }

    const savedPlan = new Plan({
      idea,
      plan,
      mode
    });

    await savedPlan.save();

    res.json({ 
      message: 'Plan saved successfully', 
      id: savedPlan._id 
    });
  } catch (error) {
    console.error('Save plan error:', error);
    res.status(500).json({ error: 'Failed to save plan' });
  }
});

// Get all saved plans
router.get('/saved', async (req, res) => {
  try {
    const plans = await Plan.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(plans);
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to retrieve plans' });
  }
});

// Get plan by ID
router.get('/saved/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.json(plan);
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ error: 'Failed to retrieve plan' });
  }
});

// Delete plan
router.delete('/saved/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});

export default router;

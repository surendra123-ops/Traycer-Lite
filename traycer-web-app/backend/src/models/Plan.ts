import mongoose, { Document, Schema } from 'mongoose';
import { Plan, PlanningMode } from '../../shared/types/planTypes';

export interface ISavedPlan extends Document {
  idea: string;
  plan: Plan;
  mode: PlanningMode;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<ISavedPlan>({
  idea: {
    type: String,
    required: true,
    trim: true
  },
  plan: {
    Frontend: [String],
    Backend: [String],
    Database: [String],
    Notes: String
  },
  mode: {
    type: String,
    enum: ['rule', 'ai'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ISavedPlan>('Plan', PlanSchema);

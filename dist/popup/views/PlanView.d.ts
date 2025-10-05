import React from 'react';
import { PlanResponse } from '../../types/planTypes';
interface PlanViewProps {
    plan: PlanResponse | null;
    onCopy: (format: 'json' | 'markdown') => void;
}
export declare const PlanView: React.FC<PlanViewProps>;
export {};
//# sourceMappingURL=PlanView.d.ts.map
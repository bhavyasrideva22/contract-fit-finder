import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: ReactNode;
  description: string;
}

export const ScoreCard = ({ title, score, icon, description }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-score-excellent';
    if (score >= 60) return 'text-score-good';
    return 'text-score-needs-work';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-score-excellent';
    if (score >= 60) return 'bg-score-good';
    return 'bg-score-needs-work';
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-medium animate-fade-in hover:shadow-strong transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-muted-foreground">/100</span>
        </div>
        
        <div className="w-full bg-progress-bg rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
};
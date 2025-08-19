import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAssessment } from "../AssessmentProvider";
import { RadarChart } from "../RadarChart";
import { ScoreCard } from "../ScoreCard";
import { RecommendationCard } from "../RecommendationCard";
import { LearningPath } from "../LearningPath";
import { Download, RotateCcw, Star, TrendingUp, Target, Brain } from "lucide-react";

export const ResultsSection = () => {
  const { scores, resetAssessment } = useAssessment();

  if (!scores) {
    return (
      <div className="min-h-screen bg-assessment-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-score-excellent';
    if (score >= 60) return 'text-score-good';
    return 'text-score-needs-work';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Development';
  };

  return (
    <div className="min-h-screen bg-assessment-bg py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Contract Manager Career Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your fit and readiness
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-strong text-center animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Overall Confidence Score</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(scores.overallConfidence)}`}>
              {scores.overallConfidence}
            </div>
            <div className="text-left">
              <div className="text-2xl font-semibold text-foreground">/ 100</div>
              <div className={`text-lg font-medium ${getScoreColor(scores.overallConfidence)}`}>
                {getScoreLabel(scores.overallConfidence)}
              </div>
            </div>
          </div>
          <RecommendationCard recommendation={scores.recommendation} score={scores.overallConfidence} />
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Psychological Fit"
            score={scores.psychometricFit}
            icon={<Brain className="w-6 h-6" />}
            description="Personality and cognitive alignment"
          />
          <ScoreCard
            title="Technical Readiness"
            score={scores.technicalReadiness}
            icon={<Target className="w-6 h-6" />}
            description="Current knowledge and skills"
          />
          <ScoreCard
            title="WISCAR Average"
            score={Math.round(Object.values(scores.wiscar).reduce((sum, score) => sum + score, 0) / 6)}
            icon={<TrendingUp className="w-6 h-6" />}
            description="Comprehensive readiness framework"
          />
        </div>

        {/* WISCAR Radar Chart */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-medium animate-fade-in">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            WISCAR Framework Analysis
          </h3>
          <RadarChart scores={scores.wiscar} />
        </Card>

        {/* Learning Path */}
        <LearningPath scores={scores} />

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-12">
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </Button>
          <Button
            onClick={resetAssessment}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
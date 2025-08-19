import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssessmentScores } from "./AssessmentProvider";
import { BookOpen, Target, TrendingUp, Award } from "lucide-react";

interface LearningPathProps {
  scores: AssessmentScores;
}

export const LearningPath = ({ scores }: LearningPathProps) => {
  const getSkillMatch = (skillName: string): number => {
    // Simplified skill matching based on scores
    const baseMatch = (scores.psychometricFit + scores.technicalReadiness) / 2;
    const adjustments: Record<string, number> = {
      'Legal Writing': scores.wiscar.skill - 10,
      'Attention to Detail': scores.wiscar.cognitive,
      'Negotiation': scores.wiscar.interest - 5,
      'Contract Software': scores.technicalReadiness - 20,
      'Risk Management': scores.wiscar.reality
    };
    
    return Math.max(0, Math.min(100, baseMatch + (adjustments[skillName] || 0)));
  };

  const careerRoles = [
    {
      title: "Contract Manager",
      description: "Oversees complete contract processes",
      fitIndicator: scores.overallConfidence >= 75 ? "Strong" : scores.overallConfidence >= 60 ? "Moderate" : "Developing"
    },
    {
      title: "Procurement Officer", 
      description: "Focus on sourcing and vendor agreements",
      fitIndicator: scores.technicalReadiness >= 70 ? "Strong" : "Moderate"
    },
    {
      title: "Legal Operations Analyst",
      description: "Legal workflow & compliance",
      fitIndicator: scores.wiscar.cognitive >= 75 ? "High" : "Moderate"
    },
    {
      title: "Commercial Officer",
      description: "Manages commercial risks and deals", 
      fitIndicator: scores.wiscar.interest >= 70 ? "Moderate" : "Developing"
    },
    {
      title: "Vendor Relationship Manager",
      description: "Maintains vendor compliance",
      fitIndicator: scores.psychometricFit >= 70 ? "Strong" : "Moderate"
    }
  ];

  const requiredSkills = [
    { name: "Legal Writing", description: "Draft/interpret clauses", match: getSkillMatch("Legal Writing") },
    { name: "Attention to Detail", description: "Detect risk/compliance issues", match: getSkillMatch("Attention to Detail") },
    { name: "Negotiation", description: "Terms, pricing, SLA handling", match: getSkillMatch("Negotiation") },
    { name: "Contract Software", description: "CLM platforms (Icertis, SAP Ariba)", match: getSkillMatch("Contract Software") },
    { name: "Risk Management", description: "Identify and mitigate contract risks", match: getSkillMatch("Risk Management") }
  ];

  const learningStages = [
    {
      stage: "Beginner",
      icon: <BookOpen className="w-5 h-5" />,
      modules: ["Intro to Contract Management", "Key Legal Terms", "Contract Lifecycle Stages", "Basic Compliance"]
    },
    {
      stage: "Intermediate", 
      icon: <Target className="w-5 h-5" />,
      modules: ["Contract Risk Management", "Vendor Negotiation", "Legal Writing Skills", "Software Tools Training"]
    },
    {
      stage: "Advanced",
      icon: <TrendingUp className="w-5 h-5" />,
      modules: ["Legal Tech Platforms", "Advanced Contract Drafting", "Strategic Negotiations", "Professional Certifications"]
    }
  ];

  const getFitColor = (indicator: string) => {
    switch (indicator) {
      case "Strong":
      case "High":
        return "bg-success text-success-foreground";
      case "Moderate":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 70) return "text-score-excellent";
    if (match >= 50) return "text-score-good";
    return "text-score-needs-work";
  };

  return (
    <div className="space-y-8">
      {/* Career Roles */}
      <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
          <Target className="w-6 h-6 text-primary" />
          <span>Top 5 Career Roles Unlocked</span>
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerRoles.map((role, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground text-sm">{role.title}</h4>
                <Badge className={`text-xs ${getFitColor(role.fitIndicator)}`}>
                  {role.fitIndicator}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills Assessment */}
      <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <span>Required Skills vs Your Match</span>
        </h3>
        <div className="space-y-4">
          {requiredSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{skill.name}</h4>
                  <span className={`font-semibold ${getMatchColor(skill.match)}`}>
                    {skill.match}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
                <div className="w-full bg-progress-bg rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      skill.match >= 70 ? 'bg-score-excellent' : 
                      skill.match >= 50 ? 'bg-score-good' : 'bg-score-needs-work'
                    }`}
                    style={{ width: `${skill.match}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Path */}
      <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
          <Award className="w-6 h-6 text-primary" />
          <span>Recommended Learning Path</span>
        </h3>
        <div className="space-y-6">
          {learningStages.map((stage, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
              <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                {stage.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">{stage.stage}</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {stage.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <span className="text-primary">•</span>
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
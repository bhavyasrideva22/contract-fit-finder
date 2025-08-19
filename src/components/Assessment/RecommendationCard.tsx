import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface RecommendationCardProps {
  recommendation: 'yes' | 'maybe' | 'no';
  score: number;
}

export const RecommendationCard = ({ recommendation, score }: RecommendationCardProps) => {
  const getRecommendationConfig = () => {
    switch (recommendation) {
      case 'yes':
        return {
          icon: <CheckCircle className="w-8 h-8 text-success" />,
          title: "Excellent Fit!",
          message: "You show strong potential for a successful career as a Contract Manager. Your psychological fit, technical readiness, and WISCAR scores indicate you're well-suited for this role.",
          bgColor: "bg-success/10",
          borderColor: "border-success/20"
        };
      case 'maybe':
        return {
          icon: <AlertCircle className="w-8 h-8 text-warning" />,
          title: "Good Potential with Development",
          message: "You demonstrate interest and some key traits for Contract Management. With targeted learning and skill development, this could be a strong career fit for you.",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20"
        };
      case 'no':
        return {
          icon: <XCircle className="w-8 h-8 text-destructive" />,
          title: "Consider Alternative Paths",
          message: "Based on your current profile, Contract Management might not be the best immediate fit. Consider exploring related roles or developing foundational skills first.",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20"
        };
    }
  };

  const config = getRecommendationConfig();

  const getNextSteps = () => {
    switch (recommendation) {
      case 'yes':
        return [
          "Begin learning contract lifecycle management",
          "Study procurement and vendor management",
          "Take courses in negotiation skills",
          "Explore contract management software (CLM platforms)",
          "Consider professional certifications (CIPS, IACCM)"
        ];
      case 'maybe':
        return [
          "Focus on developing attention to detail skills",
          "Study basic legal and compliance concepts",
          "Practice written communication and analysis",
          "Gain exposure to contract-related work",
          "Build foundational knowledge before specializing"
        ];
      case 'no':
        return [
          "Consider related roles like Procurement Assistant",
          "Explore Legal Operations or Administrative positions",
          "Focus on developing core business skills",
          "Gain more experience before reassessing",
          "Consider your interests in other career areas"
        ];
    }
  };

  return (
    <Card className={`p-6 ${config.bgColor} border-2 ${config.borderColor} animate-fade-in`}>
      <div className="flex items-start space-x-4">
        {config.icon}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">{config.title}</h3>
          <p className="text-foreground/80 mb-4 leading-relaxed">{config.message}</p>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">Recommended Next Steps:</h4>
            <ul className="space-y-1">
              {getNextSteps().map((step, index) => (
                <li key={index} className="text-sm text-foreground/70 flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
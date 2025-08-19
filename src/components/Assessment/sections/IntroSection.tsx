import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";

interface IntroSectionProps {
  onStart: () => void;
}

export const IntroSection = ({ onStart }: IntroSectionProps) => {
  return (
    <div className="min-h-screen bg-assessment-bg flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Is a Career as a Contract Manager Right for You?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover your fit, readiness, and next steps with our comprehensive AI-powered career assessment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">What We'll Assess</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Psychological Compatibility</h3>
                  <p className="text-muted-foreground">Your personality traits and cognitive style alignment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Technical Readiness</h3>
                  <p className="text-muted-foreground">Current skills and knowledge assessment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">WISCAR Framework</h3>
                  <p className="text-muted-foreground">Will, Interest, Skill, Cognitive, Ability, Reality analysis</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">About Contract Management</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Contract Managers oversee the creation, negotiation, execution, and monitoring of legal agreements between organizations and third parties. They ensure compliance, mitigate risk, and improve financial and legal outcomes.
            </p>
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Typical Roles:</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Contract Manager</li>
                <li>• Procurement Contracts Officer</li>
                <li>• Commercial Manager</li>
                <li>• Legal Operations Manager</li>
                <li>• Vendor/Supplier Manager</li>
              </ul>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-card shadow-medium text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">25-30 minutes</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-muted-foreground">Comprehensive Analysis</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">Personalized Results</span>
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-12 py-4 text-lg shadow-glow transition-all duration-300 hover:scale-105"
          >
            Start Assessment
          </Button>
        </Card>
      </div>
    </div>
  );
};
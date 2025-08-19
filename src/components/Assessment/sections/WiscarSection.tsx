import { QuestionCard, Question } from "../QuestionCard";
import { useAssessment } from "../AssessmentProvider";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "../ProgressBar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const wiscarQuestions: Question[] = [
  // Will (Grit & Perseverance)
  {
    id: "wiscar_will_1",
    text: "I keep pushing through setbacks and challenges in my work.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "will"
  },
  {
    id: "wiscar_will_2",
    text: "I am willing to work hard to master new skills, even if it takes time.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "will"
  },
  
  // Interest (Role Alignment)
  {
    id: "wiscar_interest_1",
    text: "I find legal and compliance topics genuinely interesting.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "interest"
  },
  {
    id: "wiscar_interest_2",
    text: "I want a role that helps reduce business risk and improve outcomes.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "interest"
  },

  // Skill (Current Abilities)
  {
    id: "wiscar_skill_1",
    text: "I have strong written communication and can explain complex topics clearly.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "skill"
  },
  {
    id: "wiscar_skill_2",
    text: "I am skilled at analyzing documents and identifying important details.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "skill"
  },

  // Cognitive (Problem-solving & Decision Making)
  {
    id: "wiscar_cognitive_1",
    text: "When faced with conflicting contract terms, I can systematically work through the issues.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "cognitive"
  },
  {
    id: "wiscar_cognitive_2",
    text: "I can balance multiple priorities and make decisions under pressure.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "cognitive"
  },

  // Ability to Learn (Growth Mindset)
  {
    id: "wiscar_ability_1",
    text: "I believe I can significantly improve my legal writing and contract skills with effort.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "ability"
  },
  {
    id: "wiscar_ability_2",
    text: "I actively seek feedback and use it to improve my performance.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "ability"
  },

  // Reality (Career Compatibility)
  {
    id: "wiscar_reality_1",
    text: "I would enjoy spending most of my day reviewing, editing, and managing contracts.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "reality"
  },
  {
    id: "wiscar_reality_2",
    text: "I am comfortable with the responsibility that comes with managing legal agreements.",
    type: "likert",
    sectionId: "wiscar",
    dimension: "reality"
  }
];

export const WiscarSection = () => {
  const { addAnswer, nextSection, previousSection, state, calculateScores } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = wiscarQuestions[currentQuestionIndex];

  const handleAnswer = (questionId: string, value: number | string) => {
    addAnswer({ questionId, value, sectionId: "wiscar" });
  };

  const handleNext = () => {
    if (currentQuestionIndex < wiscarQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScores();
      nextSection();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      previousSection();
    }
  };

  const getCurrentAnswer = () => {
    const answer = state.answers.find(a => a.questionId === currentQuestion.id);
    return answer?.value;
  };

  const isAnswered = getCurrentAnswer() !== undefined;

  const getDimensionName = (dimension: string) => {
    const names = {
      will: "Will (Perseverance)",
      interest: "Interest (Motivation)",
      skill: "Skill (Current Abilities)",
      cognitive: "Cognitive (Problem-solving)",
      ability: "Ability (Learning Readiness)",
      reality: "Reality (Career Fit)"
    };
    return names[dimension as keyof typeof names] || dimension;
  };

  return (
    <div className="min-h-screen bg-assessment-bg flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            WISCAR Framework Analysis
          </h2>
          <p className="text-muted-foreground text-center mb-2">
            Comprehensive evaluation of your readiness and fit
          </p>
          {currentQuestion.dimension && (
            <p className="text-primary text-center font-medium mb-6">
              Current Focus: {getDimensionName(currentQuestion.dimension)}
            </p>
          )}
          <ProgressBar 
            currentStep={currentQuestionIndex} 
            totalSteps={wiscarQuestions.length}
            className="mb-8"
          />
        </div>

        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={getCurrentAnswer()}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {wiscarQuestions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-gradient-primary hover:opacity-90 text-white flex items-center space-x-2"
          >
            <span>{currentQuestionIndex === wiscarQuestions.length - 1 ? 'Get Results' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
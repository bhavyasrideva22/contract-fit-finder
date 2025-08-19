import { QuestionCard, Question } from "../QuestionCard";
import { useAssessment } from "../AssessmentProvider";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "../ProgressBar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const psychometricQuestions: Question[] = [
  {
    id: "psych_detail_1",
    text: "I naturally pay attention to minor details that others often miss.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_structure_1",
    text: "I prefer clearly defined processes over open-ended, creative tasks.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_legal_1",
    text: "I enjoy reading contracts, legal documentation, or policy materials.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_risk_1",
    text: "I naturally think about potential risks and how to prevent them.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_organization_1",
    text: "I am highly organized and prefer to keep detailed records.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_communication_1",
    text: "I can communicate complex information clearly to different audiences.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_negotiation_1",
    text: "I enjoy finding win-win solutions during negotiations or discussions.",
    type: "likert",
    sectionId: "psychometric"
  },
  {
    id: "psych_pressure_1",
    text: "I work well under pressure and can manage multiple deadlines.",
    type: "likert",
    sectionId: "psychometric"
  }
];

export const PsychometricSection = () => {
  const { addAnswer, nextSection, previousSection, state } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = psychometricQuestions[currentQuestionIndex];

  const handleAnswer = (questionId: string, value: number | string) => {
    addAnswer({ questionId, value, sectionId: "psychometric" });
  };

  const handleNext = () => {
    if (currentQuestionIndex < psychometricQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
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

  return (
    <div className="min-h-screen bg-assessment-bg flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Personality & Interest Assessment
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Help us understand your natural preferences and working style
          </p>
          <ProgressBar 
            currentStep={currentQuestionIndex} 
            totalSteps={psychometricQuestions.length}
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
            Question {currentQuestionIndex + 1} of {psychometricQuestions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-gradient-primary hover:opacity-90 text-white flex items-center space-x-2"
          >
            <span>{currentQuestionIndex === psychometricQuestions.length - 1 ? 'Continue to Technical' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
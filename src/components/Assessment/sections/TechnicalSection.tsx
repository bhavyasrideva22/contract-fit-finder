import { QuestionCard, Question } from "../QuestionCard";
import { useAssessment } from "../AssessmentProvider";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "../ProgressBar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const technicalQuestions: Question[] = [
  {
    id: "tech_force_majeure",
    text: "What is 'Force Majeure' in contract terms?",
    type: "multiple-choice",
    sectionId: "technical",
    options: [
      { value: "1", label: "A clause that allows contract termination due to extraordinary circumstances" },
      { value: "2", label: "A penalty clause for late delivery" },
      { value: "3", label: "A pricing adjustment mechanism" },
      { value: "4", label: "I'm not familiar with this term" }
    ]
  },
  {
    id: "tech_nda_usage",
    text: "When is a Non-Disclosure Agreement (NDA) typically required?",
    type: "multiple-choice",
    sectionId: "technical",
    options: [
      { value: "1", label: "Before sharing confidential business information" },
      { value: "2", label: "Only after signing the main contract" },
      { value: "3", label: "When terminating a contract" },
      { value: "4", label: "I'm not sure about NDA requirements" }
    ]
  },
  {
    id: "tech_contract_lifecycle",
    text: "What are the main stages of contract lifecycle management?",
    type: "multiple-choice",
    sectionId: "technical",
    options: [
      { value: "1", label: "Creation, Negotiation, Execution, Management, Renewal/Termination" },
      { value: "2", label: "Planning, Writing, Signing" },
      { value: "3", label: "Drafting, Approval, Filing" },
      { value: "4", label: "I'm not familiar with contract lifecycle stages" }
    ]
  },
  {
    id: "tech_liability_clause",
    text: "Which clause typically protects a company from late delivery penalties?",
    type: "multiple-choice",
    sectionId: "technical",
    options: [
      { value: "1", label: "Limitation of Liability clause" },
      { value: "2", label: "Confidentiality clause" },
      { value: "3", label: "Termination clause" },
      { value: "4", label: "I'm not sure about liability clauses" }
    ]
  },
  {
    id: "tech_experience",
    text: "How would you rate your experience with contract-related work?",
    type: "multiple-choice",
    sectionId: "technical",
    options: [
      { value: "5", label: "Extensive - I've managed contracts professionally" },
      { value: "4", label: "Some experience - I've reviewed or worked with contracts" },
      { value: "3", label: "Basic - I've read contracts but not managed them" },
      { value: "2", label: "Limited - I've seen contracts but don't understand them well" },
      { value: "1", label: "No experience with contracts" }
    ]
  },
  {
    id: "tech_software_familiarity",
    text: "Are you familiar with contract management software or legal tech tools?",
    type: "multiple-choice",
    sectionId: "technical",
    options: [
      { value: "5", label: "Very familiar - I've used CLM platforms like Icertis, SAP Ariba, or similar" },
      { value: "4", label: "Somewhat familiar - I've used basic contract management tools" },
      { value: "3", label: "Limited familiarity - I've heard of these tools" },
      { value: "2", label: "Not familiar but interested in learning" },
      { value: "1", label: "Not familiar and haven't considered it" }
    ]
  }
];

export const TechnicalSection = () => {
  const { addAnswer, nextSection, previousSection, state } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = technicalQuestions[currentQuestionIndex];

  const handleAnswer = (questionId: string, value: number | string) => {
    addAnswer({ questionId, value, sectionId: "technical" });
  };

  const handleNext = () => {
    if (currentQuestionIndex < technicalQuestions.length - 1) {
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
            Technical Knowledge Assessment
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Let's evaluate your current understanding of contract management concepts
          </p>
          <ProgressBar 
            currentStep={currentQuestionIndex} 
            totalSteps={technicalQuestions.length}
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
            Question {currentQuestionIndex + 1} of {technicalQuestions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-gradient-primary hover:opacity-90 text-white flex items-center space-x-2"
          >
            <span>{currentQuestionIndex === technicalQuestions.length - 1 ? 'Continue to WISCAR' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
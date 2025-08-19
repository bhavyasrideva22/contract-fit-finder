import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: { value: string; label: string }[];
  sectionId: string;
  dimension?: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, value: number | string) => void;
  currentAnswer?: number | string;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(currentAnswer?.toString() || "");

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    onAnswer(question.id, question.type === 'likert' ? Number(value) : value);
  };

  const renderLikertScale = () => {
    const likertOptions = [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" }
    ];

    return (
      <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-4">
        {likertOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
            <Label 
              htmlFor={`${question.id}-${option.value}`} 
              className="flex-1 cursor-pointer font-medium"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;

    return (
      <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-3">
        {question.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all">
            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
            <Label 
              htmlFor={`${question.id}-${option.value}`} 
              className="flex-1 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  return (
    <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground leading-relaxed">
          {question.text}
        </h3>
        
        <div className="space-y-4">
          {question.type === 'likert' && renderLikertScale()}
          {question.type === 'multiple-choice' && renderMultipleChoice()}
          {question.type === 'scenario' && renderMultipleChoice()}
        </div>
      </div>
    </Card>
  );
};
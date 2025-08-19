import { createContext, useContext, useState, ReactNode } from 'react';

export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  sectionId: string;
}

export interface AssessmentState {
  currentSection: number;
  answers: AssessmentAnswer[];
  startTime: Date;
  isComplete: boolean;
}

export interface AssessmentScores {
  psychometricFit: number;
  technicalReadiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    reality: number;
  };
  overallConfidence: number;
  recommendation: 'yes' | 'maybe' | 'no';
}

interface AssessmentContextType {
  state: AssessmentState;
  scores: AssessmentScores | null;
  addAnswer: (answer: AssessmentAnswer) => void;
  nextSection: () => void;
  previousSection: () => void;
  calculateScores: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

interface AssessmentProviderProps {
  children: ReactNode;
}

export const AssessmentProvider = ({ children }: AssessmentProviderProps) => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    answers: [],
    startTime: new Date(),
    isComplete: false
  });

  const [scores, setScores] = useState<AssessmentScores | null>(null);

  const addAnswer = (answer: AssessmentAnswer) => {
    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== answer.questionId),
        answer
      ]
    }));
  };

  const nextSection = () => {
    setState(prev => ({
      ...prev,
      currentSection: prev.currentSection + 1
    }));
  };

  const previousSection = () => {
    setState(prev => ({
      ...prev,
      currentSection: Math.max(0, prev.currentSection - 1)
    }));
  };

  const calculateScores = () => {
    // Scoring algorithm based on WISCAR framework
    const psychometricAnswers = state.answers.filter(a => a.sectionId === 'psychometric');
    const technicalAnswers = state.answers.filter(a => a.sectionId === 'technical');
    const wiscarAnswers = state.answers.filter(a => a.sectionId === 'wiscar');

    // Calculate psychometric fit (0-100)
    const psychometricFit = psychometricAnswers.length > 0 
      ? Math.round(psychometricAnswers.reduce((sum, a) => sum + Number(a.value), 0) / psychometricAnswers.length * 20)
      : 0;

    // Calculate technical readiness (0-100)
    const technicalReadiness = technicalAnswers.length > 0
      ? Math.round(technicalAnswers.reduce((sum, a) => sum + Number(a.value), 0) / technicalAnswers.length * 20)
      : 0;

    // Calculate WISCAR scores
    const wiscarScores = {
      will: calculateWiscarDimension(wiscarAnswers, 'will'),
      interest: calculateWiscarDimension(wiscarAnswers, 'interest'),
      skill: calculateWiscarDimension(wiscarAnswers, 'skill'),
      cognitive: calculateWiscarDimension(wiscarAnswers, 'cognitive'),
      ability: calculateWiscarDimension(wiscarAnswers, 'ability'),
      reality: calculateWiscarDimension(wiscarAnswers, 'reality')
    };

    const wiscarAverage = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
    const overallConfidence = Math.round((psychometricFit + technicalReadiness + wiscarAverage) / 3);

    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    if (overallConfidence >= 80) recommendation = 'yes';
    else if (overallConfidence >= 60) recommendation = 'maybe';

    const calculatedScores: AssessmentScores = {
      psychometricFit,
      technicalReadiness,
      wiscar: wiscarScores,
      overallConfidence,
      recommendation
    };

    setScores(calculatedScores);
    setState(prev => ({ ...prev, isComplete: true }));
  };

  const calculateWiscarDimension = (answers: AssessmentAnswer[], dimension: string): number => {
    const dimensionAnswers = answers.filter(a => a.questionId.includes(dimension));
    if (dimensionAnswers.length === 0) return 0;
    return Math.round(dimensionAnswers.reduce((sum, a) => sum + Number(a.value), 0) / dimensionAnswers.length * 20);
  };

  const resetAssessment = () => {
    setState({
      currentSection: 0,
      answers: [],
      startTime: new Date(),
      isComplete: false
    });
    setScores(null);
  };

  return (
    <AssessmentContext.Provider value={{
      state,
      scores,
      addAnswer,
      nextSection,
      previousSection,
      calculateScores,
      resetAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};
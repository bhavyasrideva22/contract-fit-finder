import { useAssessment } from "./AssessmentProvider";
import { IntroSection } from "./sections/IntroSection";
import { PsychometricSection } from "./sections/PsychometricSection";
import { TechnicalSection } from "./sections/TechnicalSection";
import { WiscarSection } from "./sections/WiscarSection";
import { ResultsSection } from "./sections/ResultsSection";

export const AssessmentFlow = () => {
  const { state, nextSection } = useAssessment();

  const sections = [
    <IntroSection onStart={nextSection} />,
    <PsychometricSection />,
    <TechnicalSection />,
    <WiscarSection />,
    <ResultsSection />
  ];

  return (
    <div className="assessment-flow">
      {sections[state.currentSection]}
    </div>
  );
};
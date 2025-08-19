import { AssessmentProvider } from "@/components/Assessment/AssessmentProvider";
import { AssessmentFlow } from "@/components/Assessment/AssessmentFlow";

const Index = () => {
  return (
    <AssessmentProvider>
      <AssessmentFlow />
    </AssessmentProvider>
  );
};

export default Index;
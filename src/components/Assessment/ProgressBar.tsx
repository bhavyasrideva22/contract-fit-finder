interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar = ({ currentStep, totalSteps, className = "" }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-progress-bg rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out animate-slide-in"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
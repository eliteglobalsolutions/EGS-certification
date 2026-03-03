export type StepperStep = {
  id: number;
  label: string;
};

export function Stepper({
  steps,
  currentStep,
  onStepChange,
}: {
  steps: StepperStep[];
  currentStep: number;
  onStepChange?: (stepId: number) => void;
}) {
  return (
    <div className="stepper" aria-label="progress-steps">
      {steps.map((step) => {
        const state = currentStep > step.id ? 'done' : currentStep === step.id ? 'current' : '';
        return (
          <button
            className={`step-item ${state}`.trim()}
            key={step.id}
            onClick={() => onStepChange?.(step.id)}
            type="button"
          >
            <span className="step-node" aria-hidden="true">
              {String(step.id).padStart(2, '0')}
            </span>
            <span className="step-label">{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}

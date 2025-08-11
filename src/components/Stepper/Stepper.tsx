import React, { useMemo } from "react";
import "./Stepper.scss";

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  active: number;
  className?: string;
  children?: React.ReactNode;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  active,
  className = "",
  children,
}) => {
  // Calculate step states and classes
  const stepStates = useMemo(() => {
    return steps.map((step, index) => {
      const isCompleted = index < active;
      const isActive = index === active;

      const stepClassName = [
        "stepper__step",
        isCompleted && "stepper__step--completed",
        isActive && "stepper__step--active",
      ]
        .filter(Boolean)
        .join(" ");

      return {
        ...step,
        stepClassName,
        showConnector: index < steps.length - 1,
        stepNumber: index + 1,
      };
    });
  }, [steps, active]);

  // Calculate wrapper className
  const wrapperClassName = useMemo(() => {
    return ["stepper-wrapper", className].filter(Boolean).join(" ");
  }, [className]);

  return (
    <div className={wrapperClassName}>
      {/* Stepper Header */}
      <div className="stepper">
        {stepStates.map(
          ({ label, stepClassName, showConnector, stepNumber }) => (
            <div key={stepNumber} className={stepClassName}>
              <div className="stepper__indicator">{stepNumber}</div>
              <div className="stepper__label">{label}</div>
              {showConnector && <div className="stepper__connector" />}
            </div>
          )
        )}
      </div>

      {/* Stepper Content */}
      {children && <div className="stepper__content">{children}</div>}
    </div>
  );
};

interface StepContentProps {
  stepIndex: number;
  currentStep: number;
  children: React.ReactNode;
}

export const StepContent: React.FC<StepContentProps> = ({
  stepIndex,
  currentStep,
  children,
}) => {
  const isVisible = useMemo(
    () => stepIndex === currentStep,
    [stepIndex, currentStep]
  );

  if (!isVisible) return null;
  return <div className="step-content">{children}</div>;
};

export default Stepper;

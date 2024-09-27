"use client"
import {
  Stepper,
  Box,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
} from "@chakra-ui/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface IStep {
  step: number;
  title: string;
  description: string;
  component: ({
    currentStep,
    setCurrentStep,
    isLast,
    isFirst,
    goToNext,
    goToPrevious,
  }: {
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    isLast: boolean;
    isFirst: boolean;
    goToNext: () => void;
    goToPrevious: () => void;
  }) => ReactNode;
}

interface IStepperContainer {
  steps: IStep[];
  defaultStep?: number;
  onChange: (currentStep: number) => void;
  disableForwarding: boolean;
}

export const StepperContainer = ({
  steps,
  defaultStep,
  onChange,
  disableForwarding,
}: IStepperContainer) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNext = () => setCurrentStep((v) => v + 1);
  const goToPrevious = () => setCurrentStep((v) => v - 1);

  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;
  const handleNavigate = (index: number) => {
    if (disableForwarding) {
      return;
    }
    if (index != steps.length - 1) {
      setCurrentStep(index);
      onChange(index);
    }
  };

  useEffect(() => {
    if (defaultStep) setCurrentStep(defaultStep);
  }, [defaultStep]);

  return (
    <div className="md:px-16 px-4">
      <Stepper index={currentStep}>
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => handleNavigate(index)}
            className="cursor-pointer "
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0" className="xs:hidden">
              <StepTitle className="xs:text-sm">{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {steps[currentStep].component({
        currentStep,
        setCurrentStep,
        goToNext,
        goToPrevious,
        isLast,
        isFirst,
      })}
    </div>
  );
};

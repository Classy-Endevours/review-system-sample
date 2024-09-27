"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { IStep, StepperContainer } from "./StepperContainer";
import LoadData from "../LoadData/LoadData";
import RichTextEditor from "../Editor/RichTextEditor";
import Publish from "../Publish/Publish";

interface StepperProp {
  id?: string;
}

const Stepper = ({ id }: StepperProp) => {
  const params = useSearchParams();
  const router = useRouter();
  const step = parseInt(params.get("step") ?? "0");

  const handleChange = (currentStep: number) => {
    router.push(`/update-quiz/${id}?step=${currentStep}`);
  };

  const steps: IStep[] = [
    {
      title: "Load Data",
      description: "upload all required files",
      step: 1,
      component: ({ goToNext }) => <LoadData goToNext={goToNext} />,
    },
    {
      title: "Generate Draft",
      description: "update any required details",
      step: 2,
      component: ({ goToNext }) => <RichTextEditor goToNext={goToNext} />,
    },
    {
      title: "Review",
      description: "finalize",
      step: 3,
      component: ({}) => <Publish />,
    },
  ];
  return (
    <div className="mt-24">
      <StepperContainer
        disableForwarding={!id}
        steps={steps}
        defaultStep={step}
        onChange={handleChange}
      />
    </div>
  );
};

export default Stepper;

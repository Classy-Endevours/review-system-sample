"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { IStep, StepperContainer } from "./StepperContainer";
import LoadData from "../LoadData/LoadData";
import RichTextEditor from "../Editor/RichTextEditor";
import Publish from "../Publish/Publish";

interface IQuiz {
  id?: string;
}

interface IOptions {
  isCorrect: boolean;
  value: string;
}
export interface IQuestions {
  _id: string;
  answer: string;
  options: IOptions[];
  order: number;
  quiz: string;
  title: string;
  questionType?: "MCQ" | "Coding" | "Descriptive";
}

const Stepper = ({ id }: IQuiz) => {
  const params = useSearchParams();
  const router = useRouter();
  const step = parseInt(params.get("step") ?? "0");

  const handleChange = (currentStep: number) => {
    router.push(`/update-quiz/${id}?step=${currentStep}`);
  };

  const steps: IStep[] = [
    {
      title: "Create",
      description: "basic",
      step: 1,
      component: ({ goToNext }) => <LoadData goToNext={goToNext} />,
    },
    {
      title: "Modify",
      description: "details",
      step: 2,
      component: ({ goToNext }) => <RichTextEditor goToNext={goToNext} />,
    },
    {
      title: "Publish",
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
        defaultStep={2||step}
        onChange={handleChange}
      />
    </div>
  );
};

export default Stepper;

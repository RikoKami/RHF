import { createContext, useContext, useState } from "react";
import { IUserContext, ModalType, Step } from "./types";

const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [step, setStep] = useState<Step>(0);

  function reset() {
    setModalType(null);
    setStep(0);
  }

  const Steps: Step[] = [0, 1];

  function handleStepChange(direction: "next" | "prev") {
    const directionMap = {
      next: (prevStep: Step) => {
        const nextStepIndex = Steps.indexOf(prevStep) + 1;
        return Steps[nextStepIndex] !== undefined
          ? Steps[nextStepIndex]
          : prevStep;
      },
      prev: (prevStep: Step) => {
        const prevStepIndex = Steps.indexOf(prevStep) - 1;
        return Steps[prevStepIndex] !== undefined
          ? Steps[prevStepIndex]
          : prevStep;
      },
    };

    if (!directionMap[direction]) {
      throw new Error(`Invalid direction: ${direction}`);
    }

    setStep((prevStep) => directionMap[direction](prevStep));
  }

  return (
    <UserContext.Provider
      value={{
        modalType,
        setModalType,

        step,
        setStep,

        reset,
        handleStepChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// vsf q n vou criar outro arquivo
// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

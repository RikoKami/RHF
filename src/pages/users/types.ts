import { Dispatch, SetStateAction } from "react";

export type ModalType = "create" | "edit";

export type Step = 0 | 1;

export interface IUserContext {
  modalType: ModalType | null;
  setModalType: (modalType: ModalType) => void;

  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;

  reset: () => void;

  handleStepChange: (direction: "next" | "prev") => void;
}

import { DevTool } from "@hookform/devtools";
import { useUser } from "../../users-context";
import { UserFormSchema, useUserForm } from "./use-user-form";
import { FormProvider } from "react-hook-form";
import { DataForm } from "./data-form";
import { AddressForm } from "./address-form";
import { Step } from "../../types";

interface ISteppers {
  submit: (data: UserFormSchema) => Promise<void>;
}

export function Steppers({ submit }: ISteppers) {
  const { step, handleStepChange, reset } = useUser();

  const steps = [<DataForm key={step} />, <AddressForm key={step} />];

  const userForm = useUserForm();

  const fields1: Array<keyof Partial<UserFormSchema>> = [
    "firstName",
    "lastName",
    "email",
  ];

  const step1Valid = !fields1.some((item) => {
    return userForm.getFieldState(item)?.invalid === true;
  });

  const fields2: Array<keyof Partial<UserFormSchema>> = [
    "road",
    "city",
    "state",
    "zip",
    "code",
  ];

  const step2Valid = !fields2.some((item) => {
    return userForm.getFieldState(item).invalid === true;
  });

  const stepMap: { [key in Step]: string[] } = {
    0: fields1,
    1: fields2,
  };

  const isDisabled = !(step1Valid || step2Valid);

  const footer = (
    <>
      {step === 1 && (
        <button
          disabled={isDisabled}
          onClick={() => {
            handleStepChange("prev");
          }}
        >
          back
        </button>
      )}

      {step === 0 && (
        <button
          disabled={isDisabled}
          onClick={async () => {
            const currentFields = stepMap[step];

            if (currentFields) {
              await userForm
                .trigger(currentFields as Array<Partial<keyof UserFormSchema>>)
                .then((resp: boolean) => {
                  return resp && handleStepChange("next");
                });
            }
          }}
        >
          next
        </button>
      )}

      {step === 1 && (
        <button
          disabled={isDisabled}
          onClick={async () => {
            const currentFields = stepMap[step];

            if (currentFields) {
              await userForm
                .trigger(currentFields as Array<Partial<keyof UserFormSchema>>)
                .then((resp: boolean) => {
                  if (resp) {
                    submit(userForm.getValues()).then(() => {
                      userForm.reset();
                      reset();
                    });
                  }
                });
            }
          }}
        >
          submit
        </button>
      )}
    </>
  );

  return (
    <FormProvider {...userForm}>
      {steps[step]}

      <DevTool control={userForm.control} placement="top-left" />

      <footer>{footer}</footer>
    </FormProvider>
  );
}

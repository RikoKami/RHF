import { UserFormSchema } from "../steppers";
import { Steppers } from "../steppers/steppers";

export function CreateForm() {
  async function onSubmit(data: UserFormSchema) {
    console.log("onSubmit", data);
  }

  return <Steppers submit={onSubmit} />;
}

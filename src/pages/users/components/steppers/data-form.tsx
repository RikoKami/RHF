import { Controller, useFormContext } from "react-hook-form";
import { UserFormSchema } from "./use-user-form";
import "./style.scss";

export function DataForm() {
  const { control } = useFormContext<UserFormSchema>();

  return (
    <div className="form">
      <h2>Data Form</h2>

      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">FirstName</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">LastName</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">Email</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />
    </div>
  );
}

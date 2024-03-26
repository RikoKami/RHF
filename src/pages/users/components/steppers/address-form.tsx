import { Controller, useFormContext } from "react-hook-form";
import { UserFormSchema } from "./use-user-form";
import "./style.scss";

export function AddressForm() {
  const { control } = useFormContext<UserFormSchema>();

  return (
    <div className="form">
      <h2>Address Form</h2>

      <Controller
        name="road"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">Road</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">City</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />

      <Controller
        name="state"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">State</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />
      <Controller
        name="zip"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">Zip</label>
            <input {...field} type="number" />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />
      <Controller
        name="code"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="">Code</label>
            <input {...field} />
            {error?.message && <span>{error?.message}</span>}
          </div>
        )}
      />
    </div>
  );
}

import { useMutation } from "react-query";
import { useFormik } from "formik";
import { Fields, initialValues, TicketBody } from "./form";
import { Input } from "../../../components";
import {
  QueryKeys,
  TicketsApiPaths,
  queryClient,
  request,
} from "../../../common";
import { ApiError, ApiValidationError, Ticket } from "../../../models";
import { useState } from "react";

export const CreateTicket = () => {
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const { values, handleChange, handleSubmit, errors, setErrors } = useFormik({
    onSubmit: (values) =>
      mutate(values, {
        onSuccess: () => {
          setErrors({});
          setGlobalErrors([]);

          queryClient.invalidateQueries([
            QueryKeys.GET_TICKETS,
            QueryKeys.GET_MY_TICKETS,
          ]);
        },
        onError: (err) => {
          if (err instanceof ApiValidationError) {
            setErrors(err.reduceErrors());
            return;
          }

          if (err instanceof ApiError) {
            setGlobalErrors(err.mapErrors());
            return;
          }

          setGlobalErrors(["COULD_NOT_CREATE_TICKET"]);
        },
      }),
    initialValues,
  });

  const { mutate } = useMutation(
    (values: TicketBody): Promise<Ticket> =>
      request(TicketsApiPaths.TicketsIndex, "post", values)
  );

  return (
    <section className="my-8 border-b pb-4">
      <p className="text-2xl py-4">Create Ticket</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
        <Input
          type="text"
          name={Fields.TITLE}
          onChange={handleChange}
          value={values.title}
          placeholder={Fields.TITLE}
          error={errors.title}
        />
        <Input
          type="number"
          name={Fields.PRICE}
          onChange={handleChange}
          value={values.price}
          placeholder={Fields.PRICE}
          error={errors.price}
        />
        <button type="submit">Submit</button>
      </form>
      {globalErrors.map((error) => (
        <p className="text-xs text-red-500" key={error}>
          {error}
        </p>
      ))}
    </section>
  );
};

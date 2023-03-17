import { useFormik } from "formik";
import { Fields, FormType, initialValues } from "./form";
import { Input } from "../../components";
import { useMutation } from "react-query";
import { request } from "../../common/request";
import { UsersApiPaths } from "../../common";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models";
import { useState } from "react";
import { Routes } from "../routes";
import { UserContext } from "../../context";
import { ApiError, ApiValidationError } from "../../models/errors";

export const Signup = () => {
  const navigate = useNavigate();
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const { setUser } = useContext(UserContext);

  const { mutate, isLoading } = useMutation(
    (values: FormType): Promise<User> =>
      request(UsersApiPaths.SignUp, "post", values)
  );

  const { handleChange, handleSubmit, values, setErrors, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setErrors({});
      setGlobalErrors([]);

      mutate(values, {
        onSuccess: (response) => {
          setUser(response);
          navigate(Routes.HOME);
        },
        onError: (error) => {
          if (error instanceof ApiValidationError) {
            setErrors(error.reduceErrors());
            return;
          }

          if (error instanceof ApiError) {
            setGlobalErrors(error.mapErrors());
            return;
          }

          setGlobalErrors(["SOMETHING_WENT_WRONG"]);
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <header className="my-2">Sign up</header>
      <main>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-start"
        >
          <Input
            type="text"
            name={Fields.EMAIL}
            value={values.email}
            onChange={handleChange}
            placeholder="email"
            error={errors.email}
          />
          <Input
            name={Fields.PASSWORD}
            value={values.password}
            onChange={handleChange}
            placeholder="password"
            type="password"
            error={errors.password}
          />
          <button disabled={isLoading} type="submit">
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
        {globalErrors.map((error) => (
          <p className="text-xs text-red-500" key={error}>
            {error}
          </p>
        ))}
      </main>
    </div>
  );
};

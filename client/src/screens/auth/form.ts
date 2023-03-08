export enum Fields {
  EMAIL = "email",
  PASSWORD = "password",
}

export type FormType = {
  [Fields.EMAIL]: string;
  [Fields.PASSWORD]: string;
};

export const initialValues: FormType = {
  email: "",
  password: "",
};

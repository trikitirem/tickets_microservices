type ApiErrorBody = { message: string }[];

export class ApiError extends Error {
  errors: ApiErrorBody;

  constructor(errors: ApiErrorBody) {
    super();
    this.errors = errors;
  }

  mapErrors() {
    return this.errors.map(({ message }) => message);
  }
}

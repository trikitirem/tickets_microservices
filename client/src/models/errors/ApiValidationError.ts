export type ApiValidationErrorBody = { message: string; field: string }[];

export class ApiValidationError extends Error {
  errors: ApiValidationErrorBody;

  constructor(errors: ApiValidationErrorBody) {
    super();
    this.errors = errors;
  }

  reduceErrors() {
    return this.errors
      .map(({ field, message }) => ({
        [field]: message,
      }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  }
}

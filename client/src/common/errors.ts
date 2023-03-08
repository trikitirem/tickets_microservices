import { ApiError, ApiValidationError } from "../models/errors";

export const handleErrors = async (response: Response) => {
  const { status } = response;

  if (status >= 500) {
    throw new Error();
  }

  const error = await response.json();
  if (error.type === "VALIDATION_ERROR") {
    throw new ApiValidationError(error.errors);
  }

  throw new ApiError(error.errors);
};

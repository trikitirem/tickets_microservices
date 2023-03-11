import { handleErrors } from "./errors";
import Cookie from "js-cookie";

const getUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    throw new Error();
  }

  return url;
};

export const request = async <T, U extends object>(
  path: string,
  method: string = "get",
  body?: U
) => {
  const url = getUrl();
  const token = Cookie.get("auth");

  const response = await fetch(`${url}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    return handleErrors(response);
  }

  const data = await response.json();
  return data as T;
};

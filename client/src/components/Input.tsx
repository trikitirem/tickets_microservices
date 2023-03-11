import { ChangeEventHandler } from "react";

type InputType =
  | { value: string; type: "text" | "password" }
  | { value: number; type: "number" };

type Props = {
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
} & InputType;

export const Input = ({
  name,
  onChange,
  value,
  placeholder,
  type,
  error,
}: Props) => {
  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="bg-transparent focus:outline-none w-72 border-b border-white"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

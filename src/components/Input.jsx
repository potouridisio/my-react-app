import { useId } from "react";

export default function Input({
  errorMessage,
  label,
  type = "text",
  ...other
}) {
  const id = useId();

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={`${id}-input`}
      >
        {label}
      </label>
      <input
        className="mt-1 block w-full rounded border border-gray-300 p-2"
        id={`${id}-input`}
        type={type}
        {...other}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

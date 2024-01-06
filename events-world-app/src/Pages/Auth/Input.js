import { memo } from "react";

export const FormInput = ({
  name,
  value,
  placeholder,
  setValue,
  isError,
  Error,
  type,
}) => {
  return (
    <>
      <input
        className={
          isError
            ? "border border-red-600 rounded p-2 mb-0"
            : "border rounded border-gray-300 p-2 mb-2"
        }
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      {isError && <span className="text-red-600 mb-2">{Error}</span>}
    </>
  );
};

export default memo(FormInput);

import { cn } from "@/lib/utils";
import React from "react";

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerStyle?: string;
  required?: boolean;
};

const TextInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  containerStyle,
  required,
}: TextInputProps) => {
  return (
    <div className={cn("flex flex-col", containerStyle)}>
      <label htmlFor={name} className="text-black text-sm uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        className="bg-transparent border-b border-gray-300 py-2 text-black focus:border-black focus:outline-none transition"
      />
    </div>
  );
};

export default TextInput;

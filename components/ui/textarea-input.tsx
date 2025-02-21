import { cn } from "@/lib/utils";
import { useState } from "react";

type TextAreaInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  containerStyle?: string;
  required?: boolean;
  maxLength?: number;
};

const TextAreaInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  containerStyle,
  required,
  maxLength,
}: TextAreaInputProps) => {
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={cn("flex flex-col", containerStyle)}>
      <label htmlFor={name} className="text-black text-sm uppercase">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleChange}
        maxLength={maxLength}
        className="bg-transparent border-b border-gray-300 py-2 text-black focus:border-black focus:outline-none transition resize-none min-h-32"
      />
      {maxLength && (
        <div className="text-xs text-gray-500 mt-1">
          {charCount}/{maxLength} caratteri
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;

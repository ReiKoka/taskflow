import { useRef, useState } from "react";
import Input from "./Input";
import { useOnClickOutside } from "usehooks-ts";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface InlineInputProps {
  placeholder: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  className?: string;
  buttonText: string;
}

function InlineInput({
  placeholder,
  onSave,
  onCancel,
  className,
  buttonText,
}: InlineInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(inputRef, onCancel);

  const handleSave = () => {
    if (!inputValue.trim()) return;
    onSave(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const baseStyles =
    "bg-muted flex h-fit flex-col gap-2 justify-between rounded-xl p-2";

  return (
    <div ref={inputRef} className={twMerge(clsx(baseStyles, className))}>
      <Input
        id="inline-input"
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-muted-foreground -mt-2 w-full p-2 text-xs"
      />
      <Button className="w-fit text-xs" onClick={handleSave} type="button">
        Add {buttonText}
      </Button>
    </div>
  );
}

export default InlineInput;

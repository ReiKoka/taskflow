import { MouseEventHandler, useRef, useState } from "react";
import Input from "./Input";
import { useOnClickOutside } from "usehooks-ts";
import Button from "./Button";

interface InlineInputProps {
  placeholder: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

function InlineInput({ placeholder, onSave, onCancel }: InlineInputProps) {
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
      handleSave();
    }
  };
  
  return (
    <div
      ref={inputRef}
      className="bg-secondary flex h-fit flex-col gap-2 rounded-xl p-2"
    >
      <Input
        id="inline-input"
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-muted-foreground -mt-2 w-full p-1"
      />
      <Button className="w-fit self-end p-1" onClick={handleSave}>
        Add List
      </Button>
    </div>
  );
}

export default InlineInput;

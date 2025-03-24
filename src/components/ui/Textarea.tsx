import { useEffect, useRef } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type TextareaProps = {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  className?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: () => Promise<void>;
};

function Textarea({
  id,
  value,
  onChange,
  onKeyDown,
  placeholder,
  className,
  setIsOpen,
  onSave,
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match content
    }
  };

  // Call adjustHeight on initial render and whenever the value changes
  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handlePrimaryButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onSave) {
      onSave();
    }

    if (setIsOpen && value) {
      setIsOpen(false);
    }
  };

  const baseStyles =
    "border-border dark:ring-offset-secondary font-secondary text-sm text-foreground dark:border-muted-foreground block h-auto w-full resize-none overflow-hidden rounded-lg border px-3 py-1.5 outline-0 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary animate-flip-down animate-once animate-duration-500 animate-delay-100 animate-ease-out";
  const styles = twMerge(clsx(baseStyles, className));

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="hidden"></label>
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        onInput={adjustHeight} // Adjust height on input
        className={styles}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className="flex items-center justify-end gap-2">
        <Button
          title="Send message"
          type="button"
          onClick={() => setIsOpen && setIsOpen(false)}
          variant="outline"
          className="h-fit w-fit py-1"
        >
          Clear
        </Button>
        <Button
          title="Send message"
          type="button"
          variant="default"
          className="h-fit w-fit py-1"
          onClick={handlePrimaryButtonClick}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Textarea;

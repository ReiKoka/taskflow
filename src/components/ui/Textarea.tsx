import { useRef } from "react";
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
};

function Textarea({ id, value, onChange, onKeyDown, placeholder, className }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  

  const baseStyles =
    "border-border font-secondary text-sm text-foreground dark:border-muted-foreground block h-auto w-full resize-none overflow-hidden rounded-lg border px-3 py-1.5 outline-0";
  const styles = twMerge(clsx(baseStyles, className));

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="hidden"></label>
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        onInput={adjustHeight}
        className={styles}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className="flex items-center justify-end gap-2">
        <Button title="Send message" type="submit" variant="outline" className="h-fit w-fit py-1">
          Clear
        </Button>
        <Button title="Send message" type="submit" variant="default" className="h-fit w-fit py-1">
          Save
        </Button>
      </div>
    </div>
  );
}

export default Textarea;

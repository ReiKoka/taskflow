import { RefObject, useEffect, useRef } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import useModal from "../../hooks/useModal";

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

const adjustHeight = (textareaRef: RefObject<HTMLTextAreaElement>) => {
  const textarea = textareaRef.current;
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
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
  const divOfTextarea = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { modalRef } = useModal();

  // Handle Click Outside div containing text area and the buttons to save the changes.
  const handleClickOutside = (event: MouseEvent | TouchEvent | FocusEvent) => {
    if (modalRef?.current && modalRef.current.contains(event.target as Node)) {
      onSave && onSave();
      setIsOpen && value && setIsOpen(false);
    }
  };

  // useEffect to adjust the height of the textarea whenever value changes. Necessary when clicking on edit button for changing a comment.
  useEffect(() => {
    adjustHeight(textareaRef as RefObject<HTMLTextAreaElement>);
  }, [value]);

  // useOnClickOutside hook to handle the click from useHooks.ts
  useOnClickOutside(divOfTextarea as RefObject<HTMLDivElement>, handleClickOutside);

  // HandlePrimaryButtonClick function to handle the save button in the text area to save the changes
  const handlePrimaryButtonClick = () => {
    onSave && onSave();
    setIsOpen && value && setIsOpen(false);
  };

  const baseStyles =
    "border-border dark:ring-offset-secondary font-secondary text-sm text-foreground dark:border-muted-foreground block h-auto w-full resize-none overflow-hidden rounded-lg border px-3 py-1.5 outline-0 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary animate-flip-down animate-once animate-duration-500 animate-delay-100 animate-ease-out";
  const styles = twMerge(clsx(baseStyles, className));

  return (
    <div className="flex w-full flex-col gap-2" ref={divOfTextarea}>
      <label htmlFor={id} className="hidden"></label>
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        onInput={() => adjustHeight(textareaRef as RefObject<HTMLTextAreaElement>)}
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

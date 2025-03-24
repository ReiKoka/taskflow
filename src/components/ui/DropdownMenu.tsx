import clsx from "clsx";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type DropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position?: string;
  children: React.ReactNode;
  className?: string;
};

function DropdownMenu({
  isOpen,
  setIsOpen,
  position = "top-[120%] left-0",
  children,
  className,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  if (!isOpen) return null;

  const baseStyles = `font-primary bg-background shadow-toast dark:bg-background absolute flex w-max min-w-fit flex-col rounded-md border-0 p-2 transition-all duration-500 ${position} visible z-50 translate-y-0 opacity-100 animate-flip-down animate-once animate-duration-500 animate-ease-out`;
  const styles = twMerge(clsx(baseStyles, className));

  return (
    <div ref={menuRef} className={styles}>
      {children}
    </div>
  );
}

export default DropdownMenu;

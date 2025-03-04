import { useEffect, useRef } from "react";

type DropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position?: string;
  children: React.ReactNode;
};

function DropdownMenu({
  isOpen,
  setIsOpen,
  position = "top-[120%] left-0",
  children,
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

  return (
    <div
      ref={menuRef}
      className={`font-primary bg-background shadow-toast dark:bg-background absolute flex w-max min-w-fit flex-col rounded-lg border-0 p-2 transition-all duration-500 ${position} visible z-50 translate-y-0 opacity-100`}
    >
      {children}
    </div>
  );
}

export default DropdownMenu;

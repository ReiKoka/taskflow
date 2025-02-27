import { HiBars2, HiXMark } from "react-icons/hi2";

import Button from "./Button";
import { useState } from "react";
import StyledLink from "./StyledLink";

function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        className="group text-muted-foreground hover:text-primary border-foreground hover:border-primary relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ease-out hover:translate-y-0"
        onClick={toggleIsOpen}
        variant="icon"
      >
        <HiBars2
          className={`text-muted-foreground group-hover:text-primary absolute h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${
            isOpen === true
              ? "rotate-[-180deg] opacity-0"
              : "rotate-0 opacity-100"
          }`}
          strokeWidth={1.5}
        />
        <HiXMark
          className={`text-muted-foreground group-hover:text-primary absolute h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${
            isOpen === true
              ? "rotate-0 opacity-100"
              : "rotate-[-180deg] opacity-0"
          }`}
          strokeWidth={1.3}
        />
      </Button>
      <nav
        className={`bg-background dark:bg-secondary fixed top-16 right-0 z-20 flex min-h-dvh w-full flex-col items-center gap-2 pt-10 transition-all duration-300 ease-out ${
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
      </nav>
    </>
  );
}

export default MenuToggle;

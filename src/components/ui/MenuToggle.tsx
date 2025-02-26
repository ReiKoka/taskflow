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
        className="group h-10 w-10 text-muted-foreground hover:text-primary border-foreground hover:border-primary hover:translate-y-0 relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ease-out"
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
        className={`flex flex-col fixed top-16 right-0 w-full min-h-dvh z-20 bg-background dark:bg-secondary pt-10 items-center gap-2 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/services">Our Services</StyledLink>
      </nav>
    </>
  );
}

export default MenuToggle;

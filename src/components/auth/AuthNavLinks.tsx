import { useState } from "react";
import Button from "../ui/Button";
import { HiChevronDown } from "react-icons/hi2";

function AuthNavLinks() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        className="group hover:translate-0"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span>Workspaces</span>
        <HiChevronDown
          className="transition-all duration-500 group-focus:rotate-180"
          strokeWidth={1.1}
        />
      </Button>
      {/* <DropdownMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      ></DropdownMenu> */}
    </div>
  );
}

export default AuthNavLinks;

import { useState } from "react";
import Button from "../ui/Button";
import { HiChevronDown } from "react-icons/hi2";
import { useLoaderData } from "@tanstack/react-router";
import { WorkspaceType } from "../../utils/types";
import DropdownMenu from "../ui/DropdownMenu";
import { getFirstLetter } from "../../utils/helpers";

function AuthNavLinks() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const workspaces = useLoaderData({ from: "/" }) as WorkspaceType[];

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

      <DropdownMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
        {workspaces?.map((workspace: WorkspaceType) => (
          <div key={workspace.id}>
            <Button
              className="hover:bg-secondary group font-secondary hover:text-secondary-foreground flex w-fit min-w-full items-center justify-start gap-4 rounded-md border-0 p-2 text-sm hover:translate-0"
              variant="outline"
            >
              <span className="bg-primary/10 border-muted-foreground group-hover:bg- h-12 w-12 rounded-lg text-center text-2xl leading-12 font-semibold">
                {getFirstLetter(workspace.name)}
              </span>
              {workspace.name}
            </Button>
          </div>
        ))}
      </DropdownMenu>
    </div>
  );
}

export default AuthNavLinks;

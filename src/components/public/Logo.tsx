import AppLogo from "../../assets/images/logo.svg?react";
import Button from "../ui/Button";

function Logo() {
  return (
    <Button
      title="App Logo"
      variant="outline"
      className="hover:text-foreground flex items-center gap-4 border-0 p-0 hover:translate-y-[0] lg:px-4 lg:py-2"
    >
      <AppLogo className="h-10 w-10 lg:h-12 lg:w-12" />
      <h3 className="font-primary hidden text-2xl font-medium tracking-wide lg:block">
        TaskFlow
      </h3>
    </Button>
  );
}

export default Logo;

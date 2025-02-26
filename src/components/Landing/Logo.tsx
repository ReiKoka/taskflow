import AppLogo from "../../assets/images/logo.svg?react";
import Button from "../ui/Button";

function Logo() {
  return (
    <Button
      title="App Logo"
      variant="outline"
      className="flex items-center gap-4 border-0 hover:translate-y-[0] hover:text-foreground p-0 lg:px-4 lg:py-2"
    >
      <AppLogo className="w-12 h-12  lg:w-14 lg:h-14" />
      <h3 className="text-2xl font-primary tracking-wide font-medium hidden lg:block">
        TaskFlow
      </h3>
    </Button>
  );
}

export default Logo;

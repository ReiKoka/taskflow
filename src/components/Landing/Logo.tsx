import AppLogo from "../../assets/images/logo.svg?react";
import Button from "../ui/Button";

function Logo() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-4 border-0 hover:translate-y-[0] hover:text-foreground "
    >
      <AppLogo className="w-14 h-14" />
      <h3 className="text-2xl font-primary tracking-wide font-medium">
        TaskFlow
      </h3>
    </Button>
  );
}

export default Logo;

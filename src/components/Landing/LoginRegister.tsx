import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

function LoginRegister() {
  return (
    <div className="flex gap-4">
      <ThemeToggle />
      <Button variant="outline" className="rounded-full">
        Register
      </Button>
      <Button variant="default" className="rounded-full">
        Login
      </Button>
    </div>
  );
}

export default LoginRegister;

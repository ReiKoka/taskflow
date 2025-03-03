import { useNavigate } from "@tanstack/react-router";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import { useMediaQuery } from "usehooks-ts";
import MenuToggle from "../ui/MenuToggle";

function LoginRegister() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1024px)");

  return (
    <div className="flex gap-4">
      <ThemeToggle />
      {!matches && <MenuToggle />}
      {matches && (
        <>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() =>
              navigate({
                to: "/register",
              })
            }
          >
            Register
          </Button>
          <Button
            variant="default"
            className="rounded-full"
            onClick={() =>
              navigate({
                to: "/login",
              })
            }
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
}

export default LoginRegister;

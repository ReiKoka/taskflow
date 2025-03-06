import { Link } from "@tanstack/react-router";
import AppLogo from "../../assets/images/logo.svg?react";


function AuthLogo() {
  return (
    <Link className="flex items-center gap-2 lg:gap-4 hover:scale-95 transition-all duration-300 hover:text-primary" to="/">
      <AppLogo className="h-10 w-10 lg:h-12 lg:w-12" />
      <h1 className="font-primary hidden font-medium tracking-wide lg:block lg:text-lg">
        TaskFlow
      </h1>
    </Link>
  );
}

export default AuthLogo;

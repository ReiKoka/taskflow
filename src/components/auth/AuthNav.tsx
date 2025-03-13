import ThemeToggle from "../ui/ThemeToggle";
import AuthLogo from "./AuthLogo";
import AuthNavLinks from "./AuthNavLinks";
import AuthSearch from "./AuthSearch";

function AuthNav() {
  return (
    <nav className="border-muted col-start-1 col-end-3 flex h-full w-full items-center gap-8 border-b p-2 lg:p-4">
      <AuthLogo />
      <AuthNavLinks />
      <div className="ml-auto flex items-center gap-2 lg:gap-4">
        <AuthSearch />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default AuthNav;

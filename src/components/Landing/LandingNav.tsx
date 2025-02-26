import { useMediaQuery } from "usehooks-ts";
import LandingLinks from "./LandingLinks";
import LoginRegister from "./LoginRegister";
import Logo from "./Logo";

function LandingNav() {
  const matches = useMediaQuery("(min-width:1024px)");
  
  return (
    <div className="p-2 lg:px-7 lg:py-4 bg-background flex items-center justify-between dark:bg-secondary">
      <Logo />
      {matches && <LandingLinks />}
      <LoginRegister />
    </div>
  );
}

export default LandingNav;

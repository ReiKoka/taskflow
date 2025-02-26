import LandingLinks from "./LandingLinks";
import LoginRegister from "./LoginRegister";
import Logo from "./Logo";

function LandingNav() {
  return (
    <div className="p-4 lg:px-8 lg:py-4 bg-background flex items-center justify-between dark:bg-secondary">
      <Logo />
      <LandingLinks />
      <LoginRegister />
    </div>
  );
}

export default LandingNav;

import LandingLinks from "./LandingLinks";
import Logo from "./Logo";

function LandingNav() {
  return (
    <div className="p-4 lg:px-8 lg:py-4 bg-background flex items-center justify-between ">
      <Logo />
      <LandingLinks />
    </div>
  );
}

export default LandingNav;

import StyledLink from "../ui/StyledLink";

function LandingLinks() {
  return (
    <nav className={`flex gap-2 items-end`}>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/about">About</StyledLink>
      <StyledLink to="/services">Our Services</StyledLink>
    </nav>
  );
}

export default LandingLinks;

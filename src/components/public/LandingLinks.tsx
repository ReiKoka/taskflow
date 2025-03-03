import StyledLink from "../ui/StyledLink";

function LandingLinks() {
  return (
    <nav className={`flex items-end gap-2`}>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </nav>
  );
}

export default LandingLinks;

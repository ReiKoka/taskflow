import { Link } from "@tanstack/react-router";

function LandingLinks() {
  return (
    <nav className="font-secondary">
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default LandingLinks;

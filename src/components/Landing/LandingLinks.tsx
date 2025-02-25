import { Link } from "@tanstack/react-router";
import Button from "../ui/Button";

function LandingLinks() {
  return (
    <nav className="font-secondary">
      <Link  to="/login">Login</Link>
      <Button>Rei</Button>
    </nav>
  );
}

export default LandingLinks;

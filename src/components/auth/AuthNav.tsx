import AuthLogo from "./AuthLogo";

function AuthNav() {
  return (
    <nav className="col-start-1 col-end-3 flex h-full max-h-full w-full items-center justify-between p-2 lg:p-4 border border-muted">
      <AuthLogo />
    </nav>
  );
}

export default AuthNav;

import AppLogo from "../../assets/logo.svg?react";

function Logo() {
  return (
    <div className="flex items-center gap-4">
      <AppLogo className="w-14 h-14" />
      <h3 className="text-2xl font-primary tracking-wide font-medium">TaskFlow</h3>
    </div>
  );
}

export default Logo;

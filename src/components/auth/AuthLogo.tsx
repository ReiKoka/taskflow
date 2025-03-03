import AppLogo from "../../assets/images/logo.svg?react";

function AuthLogo() {
  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <AppLogo className="w-10 h-10 lg:w-12 lg:h-12" />
      <h1 className="font-primary font-medium tracking-wide hidden lg:block lg:text-lg">TaskFlow</h1>
    </div>
  )
}

export default AuthLogo

import AuthNav from "./AuthNav";

function AuthenticatedLanding() {
  return (
    <div className="bg-background dark:bg-secondary text-foreground mx-auto grid h-dvh w-full max-w-[2000px] grid-cols-1 grid-rows-[50px_1fr] flex-col lg:grid-cols-[300px_1fr] lg:grid-rows-[60px_1fr]">
      <AuthNav />
    </div>
  );
}

export default AuthenticatedLanding;

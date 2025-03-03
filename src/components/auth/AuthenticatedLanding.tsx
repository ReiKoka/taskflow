import AuthNav from "./AuthNav";
import MainAppContainer from "./MainAppContainer";
import Sidebar from "./Sidebar";

function AuthenticatedLanding() {
  return (
    <div className="bg-background text-foreground mx-auto grid h-dvh w-full max-w-[2000px] grid-cols-1 grid-rows-[50px_1fr] flex-col lg:grid-cols-[300px_1fr] lg:grid-rows-[60px_1fr]">
      <AuthNav />
      <Sidebar />
      <MainAppContainer />
    </div>
  );
}

export default AuthenticatedLanding;

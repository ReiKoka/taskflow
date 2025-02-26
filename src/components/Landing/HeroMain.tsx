import { HiChevronRight } from "react-icons/hi2";
import CompanyLogo from "../../assets/images/logo.svg?react";
import Button from "../ui/Button";


function HeroMain() {
  return (
    <div className="w-fit max-w-[800px] flex items-center justify-center flex-col gap-4 lg:gap-6">
      <div className="w-36 h-36 bg-background shadow-custom shadow-primary rounded-3xl mb-14">
        <CompanyLogo className="w-full h-full" />
      </div>
      <h1 className="text-6xl font-primary w-full text-center flex flex-col gap-4 font-medium">
        <span>
          Plan, Track, and <span className="text-primary">Succeed</span>
        </span>
        <span className="text-muted-foreground">all in one place</span>
      </h1>
      <h3 className="font-secondary text-secondary-foreground text-xl font-medium">
        Simplify task management and stay productive effortlessly.
      </h3>
      <Button className="mt-10 rounded-full text-lg font-medium px-8 py-4">
        <span>Get started</span>
        <HiChevronRight strokeWidth={1} />
      </Button>
    </div>
  );
}

export default HeroMain;

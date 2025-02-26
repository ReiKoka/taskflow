import { HiChevronRight } from "react-icons/hi2";
import CompanyLogo from "../../assets/images/logo.svg?react";
import Button from "../ui/Button";

function HeroMain() {
  return (
    <div className="w-fit max-w-[800px] flex items-center min-h-full flex-col lg:gap-6">
      <div className="w-36 h-36 bg-background shadow-custom shadow-primary mt-auto rounded-3xl mb-8 lg:mb-14 animate-wiggle animate-infinite animate-duration-[2000ms] ">
        <CompanyLogo className="w-full h-full" />
      </div>
      <h1 className="text-xl mt-auto font-primary w-full text-center flex flex-col gap-1 font-medium lg:text-3xl lg:gap-2 2xl:text-6xl 2xl:gap-4">
        <span>
          Plan, Track, and <span className="text-primary">Succeed</span>
        </span>
        <span className="text-muted-foreground">all in one place</span>
      </h1>
      <h3 className="font-secondary text-secondary-foreground text-sm text-center px-4 font-medium">
        Simplify task management and stay productive effortlessly.
      </h3>
      <Button className="mt-auto justify-between rounded-full w-full lg:w-fit text-lg font-medium px-8 py-4 animate-bounce animate-thrice animate-fill-backwards">
        <span>Get started</span>
        <HiChevronRight strokeWidth={1} />
      </Button>
    </div>
  );
}

export default HeroMain;

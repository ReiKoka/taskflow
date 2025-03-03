import { HiChevronRight } from "react-icons/hi2";
import CompanyLogo from "../../assets/images/logo.svg?react";
import Button from "../ui/Button";

function HeroMain() {
  return (
    <div className="flex min-h-full w-full max-w-[800px] flex-col items-center lg:gap-6 sm:justify-around">
      <div className="bg-background shadow-custom shadow-primary animate-wiggle animate-infinite animate-duration-[2000ms] md: mt-auto mb-8 h-36 w-36 rounded-3xl sm:mt-0 lg:mb-14">
        <CompanyLogo className="h-full w-full" />
      </div>

      <h1 className="font-primary mt-auto flex w-full flex-col gap-1 text-center text-xl font-medium sm:mt-0 lg:gap-2 lg:text-3xl 2xl:gap-4 2xl:text-6xl">
        <span>
          Plan, Track, and <span className="text-primary">Succeed</span>
        </span>
        <span className="text-muted-foreground">all in one place</span>
      </h1>

      <h3 className="font-secondary text-secondary-foreground px-4 text-center text-sm font-medium">
        Simplify task management and stay productive effortlessly.
      </h3>

      <Button className="animate-thrice animate-fill-backwards mt-auto w-full animate-bounce justify-between rounded-full px-8 py-4 text-lg font-medium sm:mt-0 sm:w-fit lg:w-fit">
        <span>Get started</span>
        <HiChevronRight strokeWidth={1} />
      </Button>
    </div>
  );
}

export default HeroMain;

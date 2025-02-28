import { createFileRoute } from "@tanstack/react-router";
import Img1 from "../assets/images/img-1.svg?react";
import Img2 from "../assets/images/img-2.svg?react";
import Img3 from "../assets/images/img-3.svg?react";
import Img4 from "../assets/images/img-4.svg?react";
import HeroImage from "../components/landing/HeroImage";
import HeroMain from "../components/landing/HeroMain";
import { useMediaQuery } from "usehooks-ts";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="pattern-bg font-secondary max-w-full rounded-t-4xl h-full max-h-full z-10 p-4 lg:p-6 relative flex items-center justify-center">
      {matches && (
        <>
          <HeroImage className="top-12 left-6 -rotate-12" Img={Img1} />
          <HeroImage className="bottom-20 left-10 -rotate-3" Img={Img2} />
          <HeroImage className="top-12 right-6 rotate-6" Img={Img3} />
          <HeroImage className="bottom-12 right-12 -rotate-12" Img={Img4} />
        </>
      )}
      <HeroMain />
    </div>
  );
}

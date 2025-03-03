import clsx from "clsx";
import { FunctionComponent } from "react";

import { twMerge } from "tailwind-merge";

type HeroImageProps = {
  className: string;
  Img: FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const baseStyles = `absolute lg:w-40 2xl:w-auto max-w-80`;

function HeroImage({ className, Img }: HeroImageProps) {
  return (
    <div className={twMerge(clsx(baseStyles, className))}>
      <Img className="h-full w-full" />
    </div>
  );
}

export default HeroImage;

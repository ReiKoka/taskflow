import { Link, LinkProps } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type StyledLinkProps = LinkProps & {
  children?: ReactNode;
  className?: string;
};

const baseStyles =
  "font-secondary font-medium px-4 py-1 lg:px-6 lg:py-2 transition duration-300 hover:translate-y-[-3px] hover:text-primary inline-block relative before:content-[''] before:absolute before:right-100 before:bottom-0 before:bg-primary before:left-0 before-w-full before:h-0.5 before:z-[-1] hover:before:right-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary";

function StyledLink({ children, className, to, ...props }: StyledLinkProps) {
  return (
    <Link to={to} {...props} className={twMerge(clsx(baseStyles, className))}>
      {children}
    </Link>
  );
}

export default StyledLink;

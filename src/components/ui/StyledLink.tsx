import { Link, LinkProps, useMatchRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type StyledLinkProps = LinkProps & {
  children?: ReactNode;
  className?: string;
};

const baseStyles =
  "font-primary tracking-wider font-medium px-4 py-1 lg:px-6 lg:py-2 transition duration-300 hover:text-primary inline-block relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary";

function StyledLink({ children, className, to, ...props }: StyledLinkProps) {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to, fuzzy: true });
  return (
    //prettier-ignore
    <Link to={to} {...props} className={twMerge(clsx(baseStyles, className, isActive && 'font-bold text-primary hover:before:w-0'))}>
      {children}
    </Link>
  );
}

export default StyledLink;

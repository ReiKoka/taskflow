import useAuth from "../../hooks/useAuth";
import NotFoundImage from "../../assets/images/not-found.svg?react";
import PublicLayout from "../../layouts/PublicLayout";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import Button from "./Button";
import { Link } from "@tanstack/react-router";
import { HiArrowRight } from "react-icons/hi2";

function NotFound() {
  const { token } = useAuth();

  const renderNotFound = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <NotFoundImage className="fill-primary animate-shake animate-twice animate-duration-300 animate-ease-out animate-delay-1000 -mt-10 w-1/2 max-w-[600px]" />
      <h1 className="font-secondary text-3xl font-semibold">
        Oops! It looks like you've wandered off the map
      </h1>
      <h3 className="text-lg font-light">Please check your URL or return to the home page</h3>
      <Link
        to="/"
        className="hover:text-primary flex items-center gap-4 font-medium underline underline-offset-4"
      >
        <span>Return Home</span>
        <HiArrowRight size={16} strokeWidth={1}/>
      </Link>
    </div>
  );

  return (
    <>
      {!token ? (
        <PublicLayout>{renderNotFound}</PublicLayout>
      ) : (
        <AuthenticatedLayout>{renderNotFound}</AuthenticatedLayout>
      )}
    </>
  );
}

export default NotFound;

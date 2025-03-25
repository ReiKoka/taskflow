import useAuth from "../../hooks/useAuth";
import NotFoundImage from "../../assets/images/not-found.svg?react";
import PublicLayout from "../../layouts/PublicLayout";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { HiArrowLeft } from "react-icons/hi2";
import Button from "./Button";

export const renderNotFound = (errorMessage: string) => {
  const [error, message] = errorMessage?.split(",");

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <NotFoundImage className="fill-primary animate-shake animate-twice animate-duration-300 animate-ease-out animate-delay-1000 -mt-10 w-1/2 max-w-[500px]" />
      <h1 className="font-secondary max-w-[800px] text-center text-3xl font-semibold">
        Oops! We can't seem to find the page you're looking for. Let's get you back on track.
      </h1>
      <h3 className="flex flex-col gap-4 text-center text-lg font-normal">
        <span>{error}</span>
        <span className="text-destructive font-medium">{message}</span>
      </h3>

      <Button className="text-lg font-medium" onClick={handleGoBack}>
        <HiArrowLeft size={16} strokeWidth={1} />
        <span>Go Back</span>
      </Button>
    </div>
  );
};

function NotFound() {
  const { token } = useAuth();
  return (
    <>
      {!token ? (
        <PublicLayout>
          {renderNotFound("Please check your URL or return to the home page")}
        </PublicLayout>
      ) : (
        <AuthenticatedLayout>
          {renderNotFound("Please check your URL or return to the home page")}
        </AuthenticatedLayout>
      )}
    </>
  );
}

export default NotFound;

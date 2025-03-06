import { useNavigate } from "@tanstack/react-router";
import NoBoardsImg from "../../../assets/images/no-boards.svg?react";
import Button from "../../ui/Button";

function EmptyWorkspace() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="flex grow flex-col items-center justify-center gap-10">
      <NoBoardsImg className="-mt-20 h-fit w-40" />
      <h3 className="text-xl font-medium">
        No boards are available in this workspace yet.
      </h3>
      <Button variant="default" className="w-fit" onClick={handleBackHome}>
        Back to home
      </Button>
    </div>
  );
}

export default EmptyWorkspace;

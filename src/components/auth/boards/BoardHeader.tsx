import { useRouter } from "@tanstack/react-router";
import Button from "../../ui/Button";
import { HiArrowLeft } from "react-icons/hi2";

type BoardHeaderProps = {
  boardName: string;
};

function BoardHeader({ boardName }: BoardHeaderProps) {
  const router = useRouter();
  const goBack = () => {
    router.history.back();
  };

  return (
    <section className="border-muted font-secondary text-foreground flex items-center gap-4 border-b p-4 text-lg font-semibold">
      <Button variant="icon" className="group border-0 p-0">
        <HiArrowLeft
          onClick={goBack}
          className="group-hover:fill-primary"
          size={16}
        />
      </Button>
      {boardName}
    </section>
  );
}

export default BoardHeader;
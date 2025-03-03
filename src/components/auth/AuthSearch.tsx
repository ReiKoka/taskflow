import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Button from "../ui/Button";

function AuthSearch() {
  const handleClick = () => {};

  return (
    <Button variant="icon" className="border-0 lg:border p-2 border-muted-foreground ">
      <HiOutlineMagnifyingGlass
        size={20}
        className="stroke-muted-foreground"
        strokeWidth={1.3}
        onClick={handleClick}
      />
    </Button>
  );
}

export default AuthSearch;

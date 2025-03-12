import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import Button from "./Button";
import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="group text-muted-foreground hover:text-primary border-muted-foreground hover:border-primary relative h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 transition-all duration-300 ease-out hover:translate-y-0 lg:h-10 lg:w-10 lg:border"
      onClick={handleToggle}
      variant="icon"
    >
      <HiOutlineSun
        className={`text-muted-foreground group-hover:text-primary absolute transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${
          theme === "light"
            ? "rotate-[-180deg] opacity-0"
            : "rotate-0 opacity-100"
        }`}
        size={20}
        strokeWidth={1.5}
      />
      <HiOutlineMoon
        className={`text-muted-foreground group-hover:text-primary absolute transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${
          theme === "light"
            ? "rotate-0 opacity-100"
            : "rotate-[-180deg] opacity-0"
        }`}
        size={20}
        strokeWidth={1.3}
      />
    </Button>
  );
}

export default ThemeToggle;

import { use } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "./Button";

function ThemeToggle() {
  const context = use(ThemeContext);

  // Handle the case where context might be undefined
  if (!context) {
    throw new Error("ThemeToggle must be used within a ThemeProvider");
  }

  const { theme, setTheme } = context;

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="group h-10 w-10 text-muted-foreground hover:text-primary border-foreground hover:border-primary hover:translate-y-0 relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ease-out"
      onClick={handleToggle}
      variant="icon"
    >
      <HiOutlineSun
        className={`text-muted-foreground group-hover:text-primary absolute h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${
          theme === "light"
            ? "rotate-[-180deg] opacity-0"
            : "rotate-0 opacity-100"
        }`}
        strokeWidth={1.5}
      />
      <HiOutlineMoon
        className={`text-muted-foreground group-hover:text-primary absolute h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${
          theme === "light"
            ? "rotate-0 opacity-100"
            : "rotate-[-180deg] opacity-0"
        }`}
        strokeWidth={1.3}
      />
    </Button>
  );
}

export default ThemeToggle;

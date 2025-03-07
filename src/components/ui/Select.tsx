import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

type SelectType = {
  id: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholderSelected: string;
  options: { value: string; textValue: string }[];
};

function Select({
  id,
  className,
  placeholderSelected,
  value,
  onChange,
  options,
}: SelectType) {
  const baseStyles =
    "border-muted block w-full min-w-full rounded-lg bg-background border p-2.5 text-foreground text-sm focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1 focus-visible:outline-0 font-secondary cursor-pointer ";

  const selectStyles = twMerge(clsx(baseStyles, className));

  return (
    <>
      <label
        htmlFor={id}
        className="font-secondary text-foreground mb-2 block text-sm"
      >
        Select an option
      </label>

      <div className="relative group">
        <select
          id={id}
          className={selectStyles}
          value={value}
          onChange={onChange}
        >
          <option selected disabled>
            {placeholderSelected}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.textValue}
            </option>
          ))}
        </select>
        <HiChevronDown
          className="fill-foreground group-focus-within:rotate-180 transition-all duration-300 cursor-pointer absolute top-[50%] right-3 translate-y-[-40%]"
          size={18}
        />
      </div>
    </>
  );
}

export default Select;

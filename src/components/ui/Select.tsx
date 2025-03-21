import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

type SelectType = {
  id: string;
  className?: string;
  value?: string ;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholderSelected: string;
  options: { value: string; textValue: string }[];
  label: string;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

function Select({
  id,
  className,
  placeholderSelected,
  value,
  onChange,
  options,
  label,
  onBlur
}: SelectType) {
  const baseStyles =
    "border-border block w-full min-w-full rounded-lg bg-background dark:bg-secondary border p-2.5 text-foreground text-sm focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1 focus-visible:outline-0 font-secondary capitalize cursor-pointer ";

  const selectStyles = twMerge(clsx(baseStyles, className));

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="font-secondary text-foreground mb-2 block text-sm font-medium"
        >
          Select an option
        </label>
      )}

      <div className="group relative">
        <select id={id} className={selectStyles} value={value} onChange={onChange} onBlur={onBlur}>
          <option value="" disabled>
            {placeholderSelected}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="capitalize">
              {option.textValue}
            </option>
          ))}
        </select>
        <HiChevronDown
          className="fill-foreground absolute top-[50%] right-3 translate-y-[-40%] cursor-pointer transition-all duration-300 group-focus-within:rotate-180"
          size={18}
        />
      </div>
    </div>
  );
}

export default Select;

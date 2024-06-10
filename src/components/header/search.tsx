import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}
const SearchBar: FC<SearchProps> = ({ className, value, onValueChange }) => {
  return (
    <div
      className={cn(
        "ml-auto flex h-10 w-full max-w-lg items-center gap-2 overflow-hidden rounded-full border-2 border-slate-400/40 text-slate-500 focus-within:border-slate-400/70 focus-within:text-slate-300",
        className,
      )}
    >
      <Search className="h-10 w-10 p-2 pl-3" />

      <input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="h-full w-full bg-transparent pr-3 outline-none"
        placeholder="Search products..."
      />
    </div>
  );
};

export default SearchBar;

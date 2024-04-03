import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FC, HTMLAttributes, createContext } from "react";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}
const SearchBar: FC<SearchProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "ml-auto flex h-10 w-full max-w-lg items-center gap-2 overflow-hidden rounded-full border border-slate-200 text-slate-300 focus-within:border-slate-500 focus-within:text-slate-500",
        className,
      )}
    >
      <input
        type="search"
        className="h-full w-full px-3 outline-none"
        placeholder="Search products..."
      />
      <Search className="h-10 w-10 p-2 pr-3" />
    </div>
  );
};

export default SearchBar;

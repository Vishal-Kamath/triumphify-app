import { Check, Forward } from "lucide-react";
import { FC, useState } from "react";

const ShareButton: FC<{ link: string }> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyTextFunction = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return !copied ? (
    <button
      onClick={copyTextFunction}
      className="flex h-8 w-8 items-center justify-center rounded-full border-1 border-slate-300 text-slate-400 hover:border-slate-700 hover:text-slate-700"
    >
      <Forward className="h-4 w-4" />
    </button>
  ) : (
    <div className="relative">
      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-5 text-xs text-green-600">
        Copied!!
      </span>
      <button className="flex h-8 w-8 items-center justify-center rounded-full border-1 border-green-600 text-green-600">
        <Check className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ShareButton;

import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { FC } from "react";

const EmailListContactForm: FC = () => {
  return (
    <div className="py-9">
      <div className="flex flex-col bg-purple-600">
        {/* <div className="h-9 w-full rounded-b-[1.5rem] bg-slate-950"></div> */}
        <div className="padding-x flex w-full items-center justify-between gap-8 py-14 max-md:flex-col max-md:items-center">
          <div className="flex flex-col gap-2 max-md:items-center">
            <h4 className="text-3xl font-semibold text-white">
              Join our mailing list
            </h4>
            <p className="text-lg font-medium text-purple-300">
              To stay up for everything we have in store for you.
            </p>
          </div>
          <div className="relative isolate flex w-full max-w-sm gap-3">
            <Input
              placeholder=" "
              className="peer border-slate-200 bg-stone-100/25 text-white"
            />
            <span className="absolute left-3 top-1/2 -z-10 hidden -translate-y-1/2 text-slate-100/80 peer-placeholder-shown:flex">
              Enter your Email
            </span>
            <button className="flex aspect-square size-10 flex-shrink-0 items-center justify-center rounded-md bg-slate-200 text-slate-700 hover:bg-white">
              <Mail className="size-5" />
            </button>
          </div>
        </div>
        {/* <div className="h-9 w-full rounded-t-[1.5rem] bg-slate-950"></div> */}
      </div>
    </div>
  );
};

export default EmailListContactForm;

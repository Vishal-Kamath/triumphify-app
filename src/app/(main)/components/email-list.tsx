import { Input } from "@/components/ui/input";
import { FC } from "react";

const EmailListContactForm: FC = () => {
  return (
    <div className="flex flex-col bg-purple-950/60">
      <div className="h-24 w-full rounded-b-[2rem] bg-slate-950"></div>
      <div className="padding-x flex w-full justify-between py-9">
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl text-slate-200">Join our mailing list</h4>
          <p className="text-lg text-slate-500">
            to stay up for everything we have in store for you
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:max-w-sm">
          <Input
            placeholder="Enter you name"
            className="border-gray-600 bg-gray-700/50 focus-visible:ring-white/50"
          />
          <Input
            placeholder="Enter you email"
            className="border-gray-600 bg-gray-700/50 focus-visible:ring-white/50"
          />
        </div>
      </div>
      <div className="h-24 w-full rounded-t-[2rem] bg-slate-950"></div>
    </div>
  );
};

export default EmailListContactForm;

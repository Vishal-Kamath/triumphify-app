import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const AccountLoading: FC = () => (
  <main className="flex w-full max-w-xl flex-col gap-6 pb-12">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-9 w-[15rem]" />
      <Skeleton className="h-6 w-[25rem]" />
    </div>
    <Separator />
  </main>
);

export default AccountLoading;

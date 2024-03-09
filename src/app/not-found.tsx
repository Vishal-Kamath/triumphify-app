import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <main className="relative isolate h-full min-h-[min(100vh,35rem)] w-full">
      <Image
        src="/404.svg"
        alt="404.svg"
        width={1000}
        height={100}
        className="absolute left-1/2 top-1/2 -z-10 max-w-2xl -translate-x-1/2 -translate-y-1/2 object-contain opacity-20"
      />
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-semibold lg:text-3xl">
          Something went wrong!!
        </h2>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-full px-6",
          )}
        >
          Go Back to Homepage
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;

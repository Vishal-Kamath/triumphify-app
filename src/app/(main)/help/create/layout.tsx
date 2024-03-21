import Image from "next/image";
import { FC, ReactNode, Suspense } from "react";

const HelpLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="padding-x flex h-full items-center justify-center gap-9 py-12 md:pb-28 md:pt-24">
      <Suspense>{children}</Suspense>
      <Image
        src="/active_support.svg"
        alt="Active support illustration"
        className="ml-auto max-w-sm max-lg:hidden"
        width={500}
        height={500}
      />
    </main>
  );
};

export default HelpLayout;

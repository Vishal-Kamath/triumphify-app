import Image from "next/image";
import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen w-full">
      <div className="w-full"></div>
      <div className="relative h-full w-2/3">
        <Image
          width={1200}
          height={1600}
          src="/banner-desktop-without-text.svg"
          className="h-full max-h-screen min-h-screen object-cover object-right"
          alt="banner image"
        />
        <Image
          width={1200}
          height={1600}
          src="/logo.svg"
          className="top-1/2 "
          alt="logo"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

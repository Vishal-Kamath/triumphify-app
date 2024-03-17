import AuthProvider from "@/components/provider/auth.provider";
import { FC, ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

const AccountLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="padding-x flex flex-col gap-6 pb-24 pt-9">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Wishlist</h2>
          <p className="text-sm text-gray-500">Manage your wishlist</p>
        </div>
        <Separator />
        <div className="flex gap-6 max-md:flex-col">{children}</div>
      </div>
    </AuthProvider>
  );
};

export default AccountLayout;

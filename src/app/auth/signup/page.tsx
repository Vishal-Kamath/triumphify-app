import { FC, Suspense } from "react";
import SignUpForm from "./sign-up-form";

const SignUpPage: FC = () => {
  return (
    <main className="padding-x flex h-full min-h-screen w-full items-center justify-center">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </main>
  );
};

export default SignUpPage;

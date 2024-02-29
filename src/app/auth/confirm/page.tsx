"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FC, useState } from "react";
import { otpValidator } from "./validator";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";

const ConfirmPage: FC = () => {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast({
        title: "Warning",
        description: "Please enter the OTP",
        variant: "warning",
      });
      return;
    }

    try {
      otpValidator.parse(otp);
    } catch (error) {
      toast({
        title: "Warning",
        description: "Invalid OTP",
        variant: "warning",
      });
      return;
    }

    setLoading(true);
    axios
      .post(
        `${process.env.ENDPOINT}/api/user/otp/confirm`,
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          toast({
            title: "Success",
            description: "Account confirmed",
            variant: "success",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: err.response.data.type,
        });
      });
  };

  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold text-slate-950">
            Confirm your account
          </h2>
          <p className="text-sm text-gray-500">
            Enter the code sent to your email to confirm your account
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="ring-transparent"
          />

          {loading ? (
            <Button disabled className="w-full">
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Confirm
            </Button>
          )}
        </div>
      </form>
    </main>
  );
};

export default ConfirmPage;

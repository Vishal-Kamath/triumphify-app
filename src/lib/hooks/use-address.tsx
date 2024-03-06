import { isServer } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import z from "zod";

const addressString = z.string().min(36).max(36);

export const useAddressState = (
  name: "billingAddress" | "shippingAddress",
): [string | undefined, (addressId: string) => void] => {
  const [addressState, setAddressState] = useState<string>();

  const handleSetAddress = (addressId: string) => {
    localStorage.setItem(name, JSON.stringify(addressId));
    setAddressState(addressId);
  };

  useEffect(() => {
    if (isServer) return;
    try {
      const storageState = localStorage.getItem(name);
      if (!storageState) return;
      const initialState = JSON.parse(storageState) as string;
      addressString.parse(initialState);
      setAddressState(initialState);
    } catch (err) {
      console.log(err);
      localStorage.removeItem(name);
      return;
    }
  }, [isServer]);

  return [addressState, handleSetAddress];
};

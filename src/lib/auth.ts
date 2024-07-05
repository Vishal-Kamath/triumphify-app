import { queryClient } from "@/components/provider/reactquery.provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  email: string;
  created_at: Date;
  id: string;
  emailVerified: boolean | null;
  tel: string | null;
  username: string | null;
  dateOfBirth: string | null;
  gender: "Male" | "Female" | "Other" | null;
  password: string;
  googleId: string | null;
  needs_to_reset_password: boolean;
  image: string | null;
  updated_at: Date | null;
}

const getMe = (): Promise<{ data: User; type: "success" | "error" }> =>
  axios
    .get<{ data: User; type: "success" | "error" }>(
      `${process.env.ENDPOINT}/api/user`,
      {
        withCredentials: true,
      },
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);

export const useMe = () =>
  useQuery({
    queryKey: ["user", "details"],
    queryFn: getMe,
    retry: 0,
    staleTime: 1000 * 60 * 15,
  });

export const invalidateUserData = () => {
  queryClient.invalidateQueries({
    queryKey: ["user"],
  });
};

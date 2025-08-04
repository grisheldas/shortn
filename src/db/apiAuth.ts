import type { IAuthForm } from "@/types";
import supabase from "./supabase";

export const login = async (props: IAuthForm) => {
  const { email, password } = props;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

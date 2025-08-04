import type { IAuthForm } from "@/types";
import supabase, { supabaseUrl } from "./supabase";

export const login = async (props: IAuthForm) => {
  const { email, password } = props;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
};

export const signup = async ({ name, email, password, profilepic }: any) => {
  const __filename = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profilepic")
    .upload(__filename, profilepic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic//${__filename}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

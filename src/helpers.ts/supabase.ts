import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NGO } from "@/types/ngo.types";
import { User } from "@/types/user.types";

export const createClient = async () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_HELPSTIR_PREBUZZ_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_HELPSTIR_PREBUZZ_SUPABASE_ANON_KEY!
  );
};

export const getClient = async () => {
  return await createClient();
};

export const addUser = async (user: User, client: SupabaseClient | any) => {
  return await client.from("users").insert(user);
};

export const addNgo = async (ngo: NGO, client: SupabaseClient | any) => {
  return await client.from("ngo").insert(ngo);
};

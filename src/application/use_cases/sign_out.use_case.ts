"use server";

import { createClient } from "@/data/infrastructures/supabase";
import { ERROR } from "@/error";

export default async function signOutUseCase() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(ERROR.USE_CASE.SIGN_OUT_FAIL.code);
  return true;
}

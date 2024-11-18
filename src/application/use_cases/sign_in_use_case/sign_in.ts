"use server";

import { createClient } from "@/data/infrastructures/supabase";
import { ERROR } from "@/error";

export interface SignInDTO {
  email: string;
  password: string;
}

export default async function signIn(dto: SignInDTO) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: dto.email,
    password: dto.password,
  });
  if (error) {
    const isInvalidCredentials = error.message.includes(
      "Invalid login credentials"
    );
    if (isInvalidCredentials)
      throw new Error(ERROR.USE_CASE.INVALID_LOG_IN_CREDENTIALS.code);
    else throw new Error(ERROR.USE_CASE.SIGN_IN_FAIL.code);
  }
}

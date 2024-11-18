"use server";

import { createClient } from "@/data/infrastructures/supabase";
import { ERROR } from "@/error";

export interface SignUpDTO {
  email: string;
  password: string;
  nickname: string;
  major?: string;
}

export default async function signUp(dto: SignUpDTO) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: dto.email,
    password: dto.password,
  });
  if (error) throw new Error(ERROR.USE_CASE.FAIL_TO_SIGN_UP.code);
}

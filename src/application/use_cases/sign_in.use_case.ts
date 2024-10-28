"use server";

import { DAO } from "@/data/daos/dao";
import { createClient } from "@/data/infrastructures/supabase";
import TABLES from "@/data/infrastructures/supabase/tables";
import DBRepository from "@/data/repositories/db.repository";
import { ERROR } from "@/error";

interface SignInDTO {
  email: string;
  password: string;
}

export default async function signInUseCase(dto: SignInDTO) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
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

  const id = data.user.id;
  const memberRepositoy = new DBRepository<DAO<"PROFILE">>(TABLES.PROFILE);
  const memberResponse = await memberRepositoy.read({ id });

  if (!memberResponse.length || !memberResponse[0])
    throw new Error(ERROR.USE_CASE.CANNOT_READ_PROFILE.code);
  const profile = memberResponse[0];

  const isFirstLogIn = profile.is_first_log_in;
  if (isFirstLogIn)
    await memberRepositoy.update(id, { is_first_log_in: false });

  const memberNickname = profile.nickname;

  return { isFirstLogIn, memberNickname };
}

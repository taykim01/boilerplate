"use server";

import { createClient } from "@/data/infrastructures/supabase";
import TABLES from "@/data/infrastructures/supabase/tables";
import DBRepository from "@/data/repositories/db.repository";
import ProfileEntity, { ProfileDTO } from "@/domain/entities/profile.entity";
import { ERROR } from "@/error";

interface SignUpDTO {
  email: string;
  password: string;
  nickname: string;
  major?: string;
}

export default async function signUpUseCase(dto: SignUpDTO) {
  const supabase = createClient();

  //1. sign up
  const { data, error } = await supabase.auth.signUp({
    email: dto.email,
    password: dto.password,
  });
  if (error) throw new Error(ERROR.USE_CASE.FAIL_TO_SIGN_UP.code);

  //2. create User
  const id = data.user!.id;
  const profileEntity = new ProfileEntity({
    nickname: dto.nickname,
    major: dto.major || "없음",
    school: "고려대학교",
    email: dto.email,
    id,
    is_first_log_in: true,
  });
  const profileDAO = profileEntity.toDAO();
  //서비스 검사하고(생략)
  //DB 올리기
  const profileRepository = new DBRepository<ProfileDTO>(TABLES.PROFILE);
  await profileRepository.create(profileDAO);
}

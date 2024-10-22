"use server";

import { createClient } from "@/data/infrastructures/supabase";
import TABLES from "@/data/infrastructures/supabase/tables";
import DBRepository from "@/data/repositories/db.repository";
import MemberEntity, { MemberTransference } from "@/domain/entities/member.entity";
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
    options: {
      emailRedirectTo: `${process.env.WEBSITE_URL!}/member/create`
    }
  });
  if (error) {
    console.error(error);
    throw new Error(ERROR.USE_CASE.SEND_EMAIL_OTP_FAIL.code);
  }

  //2. create User
  const id = data.user!.id;
  const memberEntity = new MemberEntity({
    nickname: dto.nickname,
    major: dto.major || "없음",
    school: "고려대학교",
    email: dto.email,
    id,
    is_first_log_in: true
  });
  const memberDAO = memberEntity.toDAO();
  //서비스 검사하고(생략)
  //DB 올리기
  const memberRepository = new DBRepository<MemberTransference>(TABLES.MEMBER);
  await memberRepository.create(memberDAO);
}

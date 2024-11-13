"use server";

import { ERROR } from "@/error";
import { createClient } from ".";

export default async function getUser() {
  const database = await createClient();
  const {
    data: { user },
  } = await database.auth.getUser();
  if (!user) throw new Error(ERROR.INFRASTRUCTURE.USER_NOT_FOUND.code);
  return user;
}

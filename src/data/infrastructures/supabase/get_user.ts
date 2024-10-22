"use server";

import { createClient } from ".";

export default async function getUser() {
  const database = createClient();
  const {
    data: { user },
  } = await database.auth.getUser();
  return user;
}

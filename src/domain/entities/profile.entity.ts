import { DAO } from "@/data/daos/dao";

interface Profile {
  data: ProfileDTO;
}

export type ProfileDTO = Omit<DAO<"PROFILE">, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export default class ProfileEntity implements Profile {
  constructor(public data: ProfileDTO) {}

  toDAO(): ProfileDTO {
    return this.data;
  }
}

import { DAO } from "@/data/daos/dao";

interface Profile {
  data: DAO<"PROFILE">;
}

export default class ProfileEntity implements Profile {
  constructor(public data: DAO<"PROFILE">) {}

  toDAO(): DAO<"PROFILE"> {
    return this.data;
  }
}

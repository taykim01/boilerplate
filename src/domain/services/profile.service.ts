import { DAO } from "@/data/daos/dao";

export default class ProfileService {
  constructor(public profileObject: DAO<"PROFILE">) {}
}

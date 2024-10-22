import { ProfileDTO } from "../entities/entity";

export default class ProfileService {
  constructor(public profileObject: ProfileDTO) {
    ProfileService.vaildateNickname();
  }

  static async vaildateNickname() {}
}

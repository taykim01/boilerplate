import { ProfileDTO } from "../entities/profile.entity";

export default class ProfileService {
  constructor(public profileObject: ProfileDTO) {
    ProfileService.vaildateNickname();
  }

  static async vaildateNickname() {}
}

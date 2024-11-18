import signUp, { SignUpDTO } from "./sign_up";

export default class SignUpUseCase {
  static signUp: (dto: SignUpDTO) => Promise<void> = signUp;
}

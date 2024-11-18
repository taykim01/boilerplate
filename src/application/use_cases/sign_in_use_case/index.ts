import signIn, { SignInDTO } from "./sign_in";

export default class SignInUseCase {
  static signIn: (dto: SignInDTO) => Promise<void> = signIn;
}

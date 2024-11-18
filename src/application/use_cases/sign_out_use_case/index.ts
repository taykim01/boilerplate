import signOut from "./sign_out";

export default class SignOutUseCase {
  static signOut: () => Promise<void> = signOut;
}

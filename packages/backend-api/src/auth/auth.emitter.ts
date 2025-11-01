import { Emit } from "vtzac/typed-emit";

export class AuthEvents {
  @Emit("login-success")
  loginSuccess(payload: { jwt: string; session: unknown }) {
    return { status: "success", timestamp: Date.now(), ...payload };
  }
}

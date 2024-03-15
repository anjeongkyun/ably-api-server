import { TokenGenerator } from "@/domain-model/generator/token-generator";
import { sign } from "@/infra/jwt/jwt-handler";

export class JwtTokenGenerator implements TokenGenerator {
  async generate(payload: object, expiresIn: number): Promise<string> {
    return await sign(payload, { expiresIn: expiresIn });
  }
}

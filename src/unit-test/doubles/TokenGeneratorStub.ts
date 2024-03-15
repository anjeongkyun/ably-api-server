import { TokenGenerator } from "@/domain-model/generator/token-generator";

export class TokenGeneratorStub implements TokenGenerator {
  generate(payload: object, expiresIn: number): Promise<string> {
    return Promise.resolve(JSON.stringify(payload));
  }
}

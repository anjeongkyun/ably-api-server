export interface TokenGenerator {
  generate(payload: object, expiresIn: number): Promise<string>;
}

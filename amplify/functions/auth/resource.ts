import { defineFunction } from '@aws-amplify/backend';

export const AuthResource = (asm: any) => {
  const authFunc = defineFunction({
    name: "Auth Validation function",
    runtime: 22,
    environment: asm
  });
  return authFunc;
}
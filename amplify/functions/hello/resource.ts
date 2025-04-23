import { defineFunction } from '@aws-amplify/backend';

export const helloResource = () => {
  return defineFunction({
    environment: {
      ENV_DATA: "data dari env data"
    }
  });
}
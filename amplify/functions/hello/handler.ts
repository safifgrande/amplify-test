import type { Handler } from 'aws-lambda';

export const handler: Handler = async () => {
  try {
    return process.env.ENV_DATA;
  } catch (e: any) {
    throw new Error(e);
  }
};
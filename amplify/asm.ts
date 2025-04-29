import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export const getASMData = async () => {
  const client = new SecretsManagerClient();
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: "grande/ec2/all-apps",
    }),
  );
  if (!response) throw new Error("Secret not found");
  const secretData = JSON.parse(response.SecretString!);
  delete secretData.AWS_REGION;

  // NODE_ENV di samakan dengan GIT_BRANCH, agar bisa di test local
  process.env.NODE_ENV = process.env.AWS_BRANCH;
  secretData.NODE_ENV = process.env.NODE_ENV;
  if (!process.env.AWS_BRANCH) {
    process.env.NODE_ENV = 'dev';
  }

  if (process.env.NODE_ENV == 'dev') secretData.DATABASE_SERVER = secretData.DATABASE_SERVER_DEV;
  if (process.env.NODE_ENV == 'test') secretData.DATABASE_SERVER = secretData.DATABASE_SERVER_TEST;
  delete secretData.DATABASE_SERVER_DEV;
  delete secretData.DATABASE_SERVER_TEST;

  return secretData;
}
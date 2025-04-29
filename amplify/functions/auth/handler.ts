import type { Handler } from 'aws-lambda';
import { authValidation } from '../../helper/auth';

export type TypeAuthEvent = {
  authorizationToken: string;
  requestContext: {
    apiId: string;
    accountId: string;
    requestId: string;
    queryString: string;
    variables: any;
  },
  requestHeaders: any;
}

export const handler: Handler = async (event: TypeAuthEvent) => {
  try {
    const session = await authValidation(event);

    return {
      isAuthorized: true,
      resolverContext: session
    };
  } catch (e: any) {
    console.log(e);
    // https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html#aws-lambda-authorization
    // tidak bisa response custom message, bisa lihat documentation di atas
    return {
      isAuthorized: false
    };
  }
}
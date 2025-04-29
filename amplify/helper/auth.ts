import * as jwt from 'jsonwebtoken';
const moment = require('moment');

type JWTDataType = {
  _id: string;
  license: string;
};

type JWTVerifyResultType = {
  exp: number;
  data: JWTDataType;
};

type AuthEventType = {
  authorizationToken: string;
};

export const authValidation = async (event: AuthEventType): Promise<JWTDataType> => {
  // check auth token from appsync lambda event
  // https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html#aws-lambda-authorization
  const apiKey = event.authorizationToken;
  if (!apiKey) throw new Error('Invalid API key');

  // menghilangkan key "Bearer " untuk mendapatkan jwt token
  const JWTToken = apiKey.split('Bearer ')[1];
  if (!JWTToken) throw new Error('Invalid JWT token');

  // validasi token expiry
  const jwtData = jwt.verify(JWTToken, process.env.CUSTOM_JWT_PROVIDER!) as JWTVerifyResultType;
  if (!jwtData.exp) throw new Error('Invalid JWT Payload');

  // JWT expiricy number is in second
  // momentjs has unix function to parse second
  // https://momentjs.com/docs/#/parsing/unix-timestamp/
  const expired = moment.unix(jwtData.exp);
  if (expired.isBefore(moment())) throw new Error('Expired JWT token');

  console.log(jwtData)

  return jwtData.data;
};


import { defineBackend } from '@aws-amplify/backend';
import { AuthResource } from './functions/auth/resource';
import { helloResource } from "./functions/hello/resource";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { getASMData } from './asm';
import { aws_appsync } from 'aws-cdk-lib';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const asm = await getASMData()

const amplifyBackend = defineBackend({
  auth: AuthResource(asm),
  hello: helloResource()
});

const cdkStack = amplifyBackend.createStack("new-app")

// appsync API
const API = new appsync.GraphqlApi(cdkStack, "appsync1", {
  name: "appsync1",
  // graphql schema
  definition: appsync.Definition.fromSchema(
    appsync.SchemaFile.fromAsset('schema.graphql')
  )
  // authorizationConfig: {
  //   defaultAuthorization: {
  //     authorizationType: aws_appsync.AuthorizationType.LAMBDA,
  //     lambdaAuthorizerConfig: {
  //       handler: amplifyBackend.auth.resources.lambda
  //     }
  //   }
  // }
});

const datasource = API.addLambdaDataSource(
  'lambda-datasource',
  amplifyBackend.hello.resources.lambda
);

datasource.createResolver('appsync-resolver', {
  typeName: 'Query',
  fieldName: 'test',
});



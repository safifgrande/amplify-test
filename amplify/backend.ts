import { defineBackend } from '@aws-amplify/backend';
import { helloResource } from "./functions/hello/resource";
import * as appsync from "aws-cdk-lib/aws-appsync";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const amplifyBackend = defineBackend({
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
});

const datasource = API.addLambdaDataSource(
  'lambda-datasource',
  amplifyBackend.hello.resources.lambda
);

datasource.createResolver('appsync-resolver', {
  typeName: 'Query',
  fieldName: 'test',
});



import { ObjectId } from "mongodb";
import mongodbConnection from "../helper/mongodb-connection";

export type TypeResultUserOwner = {
  _id: ObjectId;
  license: ObjectId;
  fullname: string;
}

export const getUser = async (license: ObjectId): Promise<TypeResultUserOwner> => {
  const db = mongodbConnection('CORE_DB')

  const user = await db.collection("user").findOne({
    license
  }, {
    projection: {
      _id: 1,
      license: 1,
      fullname: 1
    }
  })

  return user as TypeResultUserOwner
}
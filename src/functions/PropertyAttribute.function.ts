import mongoose from "mongoose";
import PropertyAttribute, {
  IPropertyAttribute,
} from "../models/Property.model";

export async function CreateProperty(body: IPropertyAttribute,userId:string) {
  return await PropertyAttribute.create(
    {
       ...body,
       seller: userId
    }
  );
}

export async function GetPropertyDetails(id:string) {
  return await PropertyAttribute.findOne({
    _id: new mongoose.Types.ObjectId(id)
  }).populate("seller")
}

export async function GetAllProperties(page:number = 1,limit:number = 10,query:string) {
  const skip = (page - 1) * limit;

  let filter = {}

  if (query && query !== "") {
    console.log("Query is ",query)
    filter = {
      place: {
        $regex: query,
        $options: "i"
      }
    }
  }

  return await PropertyAttribute.find(filter).limit(limit).skip(skip).sort({createdAt:-1}).populate("seller")
}

export async function UserAllProperties(userId:string) {
  return await PropertyAttribute.find({
    seller: new mongoose.Types.ObjectId(userId)
  })
}

export async function UpdateProperty(id:string,body:IPropertyAttribute) {
  return await PropertyAttribute.updateOne({_id:new mongoose.Types.ObjectId(id)},body)
}

export async function DeleteProperty(id:string) {
  return await PropertyAttribute.deleteOne({_id:new mongoose.Types.ObjectId(id)})
}


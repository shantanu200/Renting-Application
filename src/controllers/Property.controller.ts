import { Context } from "hono";
import { IJWtPayload } from "../middleware/auth";
import { ErrorHandler, SuccessHandler } from "../handler/Request";
import {
  CreateProperty,
  DeleteProperty,
  GetAllProperties,
  GetPropertyDetails,
  UpdateProperty,
  UserAllProperties,
} from "../functions/PropertyAttribute.function";

export async function CreatePropertyModel(c: IJWtPayload) {
  const { user } = c;
  const body = await c.req.json();
  if (user?.type !== "SELLER") {
    return ErrorHandler(c, "Only Seller can create property");
  }

  const propertyObj = await CreateProperty(body, String(user?._id));

  if (propertyObj?._id) {
    return SuccessHandler(c, propertyObj, "Property Created successfully");
  }

  return ErrorHandler(c, "Unable to create property");
}

export async function GetAllPropertiesModel(c: IJWtPayload) {
  const { user } = c;

  const { page, limit, q } = c.req.query();

  const propertyObj = await GetAllProperties(
    Number(page),
    Number(limit),
    String(q)
  );

  return SuccessHandler(c, propertyObj, "All properties found");
}

export async function UserAllPropertiesModel(c: IJWtPayload) {
  const { user } = c;

  const propertyObj = await UserAllProperties(String(user?._id));

  return SuccessHandler(c, propertyObj, "User all properties found");
}

export async function UpdatePropertyModel(c: IJWtPayload) {
  const body = await c.req.json();
  const id = c.req.param("id")
  const { user } = c;

  const propertyObj = await UpdateProperty(String(id), body);

  if (propertyObj) {
    return SuccessHandler(c, propertyObj, "Property details updated");
  }

  return ErrorHandler(c, "Unable to update property details");
}

export async function GetPropertyModel(c: IJWtPayload) {
  const id = c.req.param("id")

  console.log(id)
  const { user } = c;

  const propertyObj = await GetPropertyDetails(String(id));

  if (propertyObj && propertyObj?._id) {
    return SuccessHandler(c, propertyObj, "Property details updated");
  }

  return ErrorHandler(c, "Unable to get property details");
}

export async function DeletePropertyModel(c: IJWtPayload) {
  const { user } = c;

  const id = c.req.param("id")

  const propertyObj = await DeleteProperty(id);

  if (propertyObj && propertyObj?.deletedCount === 1) {
    return SuccessHandler(c, propertyObj, "Property details updated");
  }

  return ErrorHandler(c, "Unable to update property details");
}

import PropertyAttribute, {
  IPropertyAttribute,
} from "../models/Property.model";

export async function CreateProperty(body: IPropertyAttribute) {
  return await PropertyAttribute.create(body);
}

export async function GetAllProperties(page:number,limit:number,query:string) {

}

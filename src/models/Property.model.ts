import mongoose, { Document, Schema } from "mongoose";

export interface IPropertyAttribute extends Document {
  area: number;
  place: string;
  bedroom: number;
  bathroom: number;
  seller: mongoose.Schema.Types.ObjectId;
}

const propertyAttributeSchema = new Schema<IPropertyAttribute>(
  {
    area: {
      type: Number,
      required: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
    
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PropertyAttribute = mongoose.model<IPropertyAttribute>(
  "PropertyAttribute",
  propertyAttributeSchema
);

export default PropertyAttribute;

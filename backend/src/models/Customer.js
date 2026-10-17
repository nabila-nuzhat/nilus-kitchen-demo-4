/** */

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "Home"
    },
    addressLine: {
      type: String,
      required: true
    },
    area: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
);

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      default: ""
    },
    bkashNumber: {
      type: String,
      default: ""
    },
    addresses: {
      type: [addressSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
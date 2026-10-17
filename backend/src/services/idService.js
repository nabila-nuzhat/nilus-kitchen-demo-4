/**
 * prefixes is a JavaScript object mapping a record type to its prefix.
 * $inc increments the database counter atomically.
 * upsert: true creates the counter if it doesn't already exist.\
 * padStart(6, "0") converts the number 1 into 000001.
 * The resulting ID is a string, not a replacement for MongoDB's ObjectId.
 * The counters are independent, so customer and order sequences do not interfere with each other.
 */

import Counter from "../models/Counter.js";

const prefixes = {
  customer: "NK_CUST",
  order: "NK_ORD",
  food: "NK_FOOD", // NOTE: Later check to update by adding Category Prefix eg. NK_FOOD_Prefix of the Category
  category: "NK_CAT" 
};

export async function generateCustomId(type) {
  const prefix = prefixes[type];

  if (!prefix) {
    throw new Error("Unknown custom ID type");
  }

  const counter = await Counter.findOneAndUpdate(
    { _id: type },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );

  return `${prefix}_${String(counter.seq).padStart(6, "0")}`;
}
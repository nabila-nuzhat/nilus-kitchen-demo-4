/**
 * A food item might have a unit of piece, plate, kg, 500 g, box or litre. The owner can add new units as text without changing the schema.
 * 
 * Here, category stores the category's MongoDB ObjectId. The ref tells Mongoose which model it references.
 */

import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    foodId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      index: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      default: "piece"
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", foodItemSchema);
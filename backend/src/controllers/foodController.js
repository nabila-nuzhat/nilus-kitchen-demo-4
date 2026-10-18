/**CRUD controller
 * 
 */

import FoodItem from "../models/FoodItem.js";
import Category from "../models/Category.js";
import { generateCustomId } from "../services/idService.js";

export async function createFoodItem(req, res, next) {
  try {
    const {
      categoryId,
      ...fields
    } = req.validatedBody;

    const category = await Category.findById(categoryId);

    if (!category || !category.isActive) {
      return res.status(400).json({
        message: "Choose an active category"
      });
    }

    const food = await FoodItem.create({
      foodId: await generateCustomId("food"),
      ...fields,
      category: category._id
    });

    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
}

export async function getFoodItems(req, res, next) {
  try {
    const foods = await FoodItem.find()
      .populate("category", "categoryId name")
      .sort({ name: 1 });

    res.json(foods);
  } catch (error) {
    next(error);
  }
}

export async function updateFoodItem(req, res, next) {
  try {
    const fields = { ...req.validatedBody };

    if (fields.categoryId) {
      const category = await Category.findById(fields.categoryId);

      if (!category || !category.isActive) {
        return res.status(400).json({
          message: "Choose an active category"
        });
      }

      fields.category = category._id;
      delete fields.categoryId;
    }

    const food = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { $set: fields },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food item not found"
      });
    }

    res.json(food);
  } catch (error) {
    next(error);
  }
}

/** 
 * populate() returns selected category fields rather than just its ObjectId.
 * ATTENTION: 
 * UPDATE to Seperate "inactive" and separate "permenant Delete"
 * here, deleteFoodItem operation is deliberately a soft delete:
 * 
*/
export async function deleteFoodItem(req, res, next) {
  try {
    const food = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { $set: { isAvailable: false } },
      { new: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food item not found"
      });
    }

    res.json({
      message: "Food item marked unavailable",
      food
    });
  } catch (error) {
    next(error);
  }
}
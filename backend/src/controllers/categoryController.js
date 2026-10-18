/**CRUD controller 
 * 
 * ATTENTION
 * One improvement for the completed application: before deleting a category, check whether food items still reference it. In that case, return 409 Conflict or require the owner to deactivate the category instead. Historical orders should never be deleted merely because a category is removed.
 * 
 * 
*/

import Category from "../models/Category.js";
import { generateCustomId } from "../services/idService.js";

export async function createCategory(req, res, next) {
  try {
    const category = await Category.create({
      categoryId: await generateCustomId("category"),
      ...req.validatedBody
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function getCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.validatedBody },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
}
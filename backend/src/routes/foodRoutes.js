import { Router } from "express";
import {
  createFoodItem,
  getFoodItems,
  updateFoodItem,
  deleteFoodItem
} from "../controllers/foodController.js";
import { validate } from "../middleware/validate.js";
import {
  foodItemSchema,
  updateFoodItemSchema
} from "../schemas/commonSchema.js";
import { requireOwner } from "../middleware/requireOwner.js";

const router = Router();

router.use(requireOwner);

router.post("/", validate(foodItemSchema), createFoodItem);
router.get("/", getFoodItems);
router.patch("/:id", validate(updateFoodItemSchema), updateFoodItem);
router.delete("/:id", deleteFoodItem);

export default router;
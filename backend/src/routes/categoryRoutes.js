/**NOTE
 * router.use(requireOwner) protects every route defined after it. The owner does not need to provide a token for public registration or login, but does need one for category management. 
 * 
 * */
import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";
import { validate } from "../middleware/validate.js";
import {
  categorySchema,
  updateCategorySchema
} from "../schemas/commonSchema.js";
import { requireOwner } from "../middleware/requireOwner.js";

const router = Router();

router.use(requireOwner);

router.post("/", validate(categorySchema), createCategory);
router.get("/", getCategories);
router.patch("/:id", validate(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
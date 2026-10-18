import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
} from "../controllers/customerController.js";
import { validate } from "../middleware/validate.js";
import {
  customerSchema,
  updateCustomerSchema
} from "../schemas/commonSchema.js";
import { requireOwner } from "../middleware/requireOwner.js";

const router = Router();

router.use(requireOwner);

router.post("/", validate(customerSchema), createCustomer);
router.get("/", getCustomers);
router.patch("/:id", validate(updateCustomerSchema), updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
/** NOTE
 * /:id/receipt.pdf is declared after the other specific order routes. Express matches routes in declaration order, so avoid ambiguous route patterns.
 */

import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  confirmOrder,
  cancelOrder
} from "../controllers/orderController.js";
import { validate } from "../middleware/validate.js";
import { orderSchema } from "../schemas/commonSchema.js";
import { requireOwner } from "../middleware/requireOwner.js";
import { downloadReceipt } from "../services/receiptService.js";

const router = Router();

router.use(requireOwner);

router.post("/", validate(orderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id/confirm", confirmOrder);
router.patch("/:id/cancel", cancelOrder);
router.get("/:id/receipt.pdf", downloadReceipt);

export default router;
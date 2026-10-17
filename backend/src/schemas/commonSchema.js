/** CHECK FOR UPDATES in fields LATER---------------- 
 * 
 * CHECK notes
*/

import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  password: z.string().min(8).max(72),
  registrationCode: z.string().min(1)
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().max(500).optional(),
  isActive: z.boolean().optional()
});

export const updateCategorySchema = categorySchema.partial();

export const foodItemSchema = z.object({
  name: z.string().trim().min(2).max(100),
  categoryId: z.string().regex(/^[a-f\d]{24}$/i),
  price: z.number().finite().min(0),
  unit: z.string().trim().min(1).max(30),
  isAvailable: z.boolean().optional()
});

export const updateFoodItemSchema = foodItemSchema.partial();

export const customerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(25),
  email: z.union([z.email(), z.literal("")]).optional(),
  bkashNumber: z.string().max(25).optional(),
  addresses: z.array(
    z.object({
      label: z.string().max(40).optional(),
      addressLine: z.string().trim().min(3).max(300),
      area: z.string().max(100).optional(),
      city: z.string().max(100).optional(),
      isDefault: z.boolean().optional()
    })
  ).optional()
});

export const updateCustomerSchema = customerSchema.partial();

export const orderSchema = z.object({
  customerId: z.string().regex(/^[a-f\d]{24}$/i),
  addressId: z.string().regex(/^[a-f\d]{24}$/i),
  items: z.array(
    z.object({
      foodItemId: z.string().regex(/^[a-f\d]{24}$/i),
      quantity: z.number().finite().positive()
    })
  ).min(1),
  deliveryCharge: z.number().finite().min(0).default(0),
  discount: z.number().finite().min(0).default(0),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "BKASH"]),
  notes: z.string().max(1000).optional()
});
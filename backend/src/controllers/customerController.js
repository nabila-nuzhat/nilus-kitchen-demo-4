/** ATTENTION
 * ??????? For a beginner production improvement, import Order at the top of this controller rather than dynamically importing it. The dynamic import above is valid ES module syntax, but a normal top-level import is simpler when there are no circular dependencies.
 */

import Customer from "../models/Customer.js";
import { generateCustomId } from "../services/idService.js";

export async function createCustomer(req, res, next) {
  try {
    const customer = await Customer.create({
      customerId: await generateCustomId("customer"),
      ...req.validatedBody
    });

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

export async function getCustomers(req, res, next) {
  try {
    const customers = await Customer.find()
      .sort({ name: 1 });

    res.json(customers);
  } catch (error) {
    next(error);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.validatedBody },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    const Order = (await import("../models/Order.js")).default;
    const hasOrders = await Order.exists({
      customer: customer._id
    });

    if (hasOrders) {
      return res.status(409).json({
        message: "Customer has order history; do not delete"
      });
    }

    await customer.deleteOne();

    res.json({ message: "Customer deleted" });
  } catch (error) {
    next(error);
  }
}
/** 
 * Why create a draft first?
The order status follows a controlled flow:
 *
 * The receipt endpoint will only accept CONFIRMED orders. That ensures the owner explicitly approves the details before generating a receipt.
 * 
 * */
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import FoodItem from "../models/FoodItem.js";
import { generateCustomId } from "../services/idService.js";

export async function createOrder(req, res, next) {
  try {
    const {
      customerId,
      addressId,
      items,
      deliveryCharge,
      discount,
      paymentMethod,
      notes
    } = req.validatedBody;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    const address = customer.addresses.id(addressId);

    if (!address) {
      return res.status(400).json({
        message: "Delivery address not found"
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const requestedItem of items) {
      const food = await FoodItem.findById(
        requestedItem.foodItemId
      );

      if (!food || !food.isAvailable) {
        return res.status(400).json({
          message: "A selected food item is unavailable"
        });
      }

      const lineTotal = Number(
        (food.price * requestedItem.quantity).toFixed(2)
      );

      subtotal += lineTotal;

      orderItems.push({
        foodItem: food._id,
        foodId: food.foodId,
        name: food.name,
        unit: food.unit,
        quantity: requestedItem.quantity,
        unitPrice: food.price,
        lineTotal
      });
    }

    subtotal = Number(subtotal.toFixed(2));

    if (discount > subtotal + deliveryCharge) {
      return res.status(400).json({
        message: "Discount exceeds the order amount"
      });
    }

    const grandTotal = Number(
      (subtotal + deliveryCharge - discount).toFixed(2)
    );

    const order = await Order.create({
      orderId: await generateCustomId("order"),
      customer: customer._id,
      customerId: customer.customerId,
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress: [
        address.addressLine,
        address.area,
        address.city
      ].filter(Boolean).join(", "),
      items: orderItems,
      subtotal,
      deliveryCharge,
      discount,
      grandTotal,
      paymentMethod,
      paymentStatus: "UNPAID",
      orderStatus: "DRAFT",
      notes: notes || ""
    });

    res.status(201).json({
      message: "Order draft created. Review before confirmation.",
      order
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function confirmOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.orderStatus !== "DRAFT") {
      return res.status(409).json({
        message: "Only draft orders can be confirmed"
      });
    }

    order.orderStatus = "CONFIRMED";
    order.confirmedAt = new Date();

    await order.save();

    res.json({
      message: "Order confirmed",
      order
    });
  } catch (error) {
    next(error);
  }
}

export async function cancelOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.orderStatus !== "DRAFT" &&
        order.orderStatus !== "CONFIRMED") {
      return res.status(409).json({
        message: "This order cannot be cancelled"
      });
    }

    order.orderStatus = "CANCELLED";
    await order.save();

    res.json({
      message: "Order cancelled",
      order
    });
  } catch (error) {
    next(error);
  }
}
/**NOTES:
 * npm run seed (to run seed file)
 * 
 * In MongoDB Compass inspect the nilus_kitchen database. should see the categories, food items, customers and counters collections after the script runs.
 * 
 * This seed script is designed to avoid inserting duplicate sample records when run again. It does not create an owner account; register and verify the owner through the authentication API.
 */

import "dotenv/config";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import Category from "./models/Category.js";
import FoodItem from "./models/FoodItem.js";
import Customer from "./models/Customer.js";
import { generateCustomId } from "./services/idService.js";

async function seed() {
  await connectDB();

  // Create sample categories only if they do not already exist.
  // // suggested sample Category Names
  // const categoryNames = ["Rice Meals", "Snacks", "Drinks"]; 
  const categoryNames = ["Frozen Foods", "Bakery", "Dessert", "Ready Meals"]; // Nilus Kitchen Draft Categories
  const categories = {};

  for (const name of categoryNames) {
    let category = await Category.findOne({ name });

    if (!category) {
      category = await Category.create({
        categoryId: await generateCustomId("category"),
        name,
        description: `Sample ${name.toLowerCase()} category`,
        isActive: true
      });
    }

    categories[name] = category;
  }

  const sampleFoods = [
    {
      name: "Porota",
      category: categories["Frozen Foods"],
      price: 15, // ?????????? add "taka with price"
      unit: "pcs" // ?????????? How to mention for now that 1 packet consists 10 pieces????????
    },
    {
      name: "Special Nankhatai",
      category: categories.Bakery,
      price: 372,
      unit: "400 gm"
    },
    {
      name: "Egg Delight", // check in orders for old price 
      category: categories.Dessert,
      price: 650,
      unit: "gm"
    },
    {
      name: "Momo with Sauce", // check in orders for old price 
      category: categories["Ready Meals"],
      price: 21,
      unit: "pcs"
    }
  ];

  for (const item of sampleFoods) {
    const existing = await FoodItem.findOne({
      name: item.name
    });

    if (!existing) {
      await FoodItem.create({
        foodId: await generateCustomId("food"),
        ...item,
        isAvailable: true
      });
    }
  }

  const existingCustomer = await Customer.findOne({
    phone: "01700000000"
  });

  if (!existingCustomer) {
    await Customer.create({
      customerId: await generateCustomId("customer"),
      name: "Demo Customer",
      phone: "01700000000",
      email: "customer@example.com",
      bkashNumber: "",
      addresses: [
        {
          label: "Home",
          addressLine: "House 10, Road 5",
          area: "Dhanmondi",
          city: "Dhaka",
          isDefault: true
        },
        {
          label: "Office",
          addressLine: "Office 2, Road 8",
          area: "Dhanmondi",
          city: "Dhaka",
          isDefault: false
        }
      ]
    });
  }

  console.log("Sample Nilus Kitchen data is ready.");
}

try {
  await seed();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
## What does the order snapshot achieve?
    Suppose an order was placed when a dish cost ৳250. Later, the owner changes the menu price to ৳280. The old order must still display ৳250 on its receipt. That's why each order item stores a copy of its name, unit, price and line total alongside the reference to the original food item.
    
## The paymentStatus 
    is also separate from orderStatus: an order can be confirmed but not yet paid, particularly for cash on delivery.
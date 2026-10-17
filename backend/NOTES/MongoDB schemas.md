## Design the MongoDB schemas
use six main collections plus a counter collection:

## Collection	    Stores
    owners	        Login, password hash, email verification
    categories	    Food category names
    fooditems	    Food names, prices, units and category references
    customers	    Customer contact details and multiple addresses
    orders	        Order items, customer, delivery, payment and totals
    counters	    Sequential custom ID counters

    - The order stores a snapshot of each food item's name, unit and price at the time the order is created. This is essential: changing a food item's price tomorrow must not change the historical receipt for an order placed today.
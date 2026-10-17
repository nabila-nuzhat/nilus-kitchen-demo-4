    - A food item might have a unit of piece, plate, kg, 500 g, box or litre. The owner can add new units as text without changing the schema.

    - Here, category stores the category's MongoDB ObjectId. The ref tells Mongoose which model it references.

    Price recommendation: store prices as integer minor currency units for robust financial arithmetic in a production system. For a beginner demo using Bangladeshi taka, this implementation uses numeric taka amounts; validate and round monetary calculations consistently. Before real business use, move to an integer-paisa or decimal-based representation.
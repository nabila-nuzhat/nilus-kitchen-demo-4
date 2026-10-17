    Why is phone a string rather than a number? Phone numbers are identifiers, not quantities. They may start with 0 or contain a country code, and you never need to add them mathematically.

## The addresses array 
    allows a customer to have a home address and additional delivery addresses. Each address has its own embedded _id.
    
## Indexing name, phone and custom ID 
    makes these useful search fields. Indexes improve reads but consume storage and can slow writes slightly.
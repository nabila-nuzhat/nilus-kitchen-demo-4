## Why use .partial() for update schemas?
    categorySchema requires a category name when creating a category. 
    
    However, updating only the description should not require resubmitting the name.
    export const updateCategorySchema = categorySchema.partial();

    This makes every field optional for a PATCH request. It does not make the values themselves unrestricted: a supplied name must still pass the original string validation.
    
    will use PATCH for partial updates and DELETE for removal.

----------------------------------------------------
## One additional rule for production: 
    reject an empty update object, and whitelist which fields can be updated. Never spread arbitrary request bodies into a Mongoose document.
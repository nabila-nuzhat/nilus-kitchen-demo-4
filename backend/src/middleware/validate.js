/** NOTE:
 * Validates the request body using a Zod schema.
 *
 * @param {import("zod").ZodType} schema - The Zod schema used to validate req.body.
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
 * Express middleware function that returns a 400 response if validation fails,
 * or stores the validated data in req.validatedBody and calls next().
 * 
 * 
 * ** The middleware validates the incoming request body. If validation fails, it sends a 400 response. If validation succeeds, it stores the parsed data in req.validatedBody and calls next() so the request can continue to createFoodItem.
 * 
 * ----------------------------------------------------------------
 * Technical breakdown:
    - validate(schema) receives a Zod schema.
    - It returns an Express middleware function.
    - safeParse() validates data without throwing a normal validation exception.
    - Invalid input returns HTTP 400 Bad Request.
    - Validated values are stored in req.validatedBody.
    - next() passes control to the next middleware or controller.
    
    Use req.validatedBody in controllers rather than trusting the original req.body.
 * 
 */

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    req.validatedBody = result.data;
    next();
  };
}
## Important improvements before real business use
This is the beginner implementation of the order calculation flow, but it is not yet a concurrency-safe production accounting system. Before relying on it for actual payments:
    
    1. Use integer paisa or a decimal-safe money representation.
    2. Validate delivery charges against your business rules instead of allowing arbitrary values.
    3. Validate discounts against a specific permission or policy.
    4. Add a unique order-creation/idempotency mechanism so a repeated request cannot accidentally create duplicate orders.
    5. Recheck that the order remains eligible when generating a receipt.
    6. Implement explicit payment-status transitions and record payment references for bKash payments.
    
The BKASH payment method here records the selected payment method only. It does not integrate with a bKash payment gateway or automatically confirm a payment.
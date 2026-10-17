## jwt.verify() 
    checks the signature and expiration of the token. 
## decoded.sub 
    is the owner's MongoDB ID. The database lookup also means a disabled or unverified account cannot access protected routes just because it has a previously issued token.

## Authorization rule: 
    every customer, category, food, order and receipt management route must use this middleware. In version 4.1, all verified owners are treated as having full dashboard access. If you later add moderators, introduce role-specific authorization rather than relying on the role field alone.
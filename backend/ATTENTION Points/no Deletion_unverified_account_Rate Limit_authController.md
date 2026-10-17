
authController-------------------
## Production hardening required: 
    add rate limiting to registration, login and verification endpoints; 
    use a dedicated verification-token secret or token record with one-time-use semantics; 
    avoid automatic account deletion on temporary SMTP failure in a production system; 
    use a secure session/cookie design or carefully managed short-lived JWTs. This example is a teaching baseline, not a complete security audit.
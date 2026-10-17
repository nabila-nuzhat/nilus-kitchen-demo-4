    Use a Gmail App Password or another SMTP provider's credentials. Never use your normal Gmail password in the project.

## For production, 
    use a dedicated, short-lived verification token and avoid placing long-lived access tokens in email links. The sample below uses a signed JWT with a short expiration to keep the beginner flow understandable.
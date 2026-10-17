## Where did EMAIL_PORT=465 come from?
    The port number is part of the SMTP connection configuration. It is not your Express server's port (PORT=5000).

## The two commonly used SMTP options are:
## Environment variable	            Meaning
    EMAIL_PORT=465	                SMTP over implicit SSL/TLS
    EMAIL_PORT=587	                SMTP with STARTTLS, typically
                                    starting the connection without TLS and upgrading it
    
    - These are standard SMTP connection options supported by Nodemailer. See its SMTP documentation: https://nodemailer.com/smtp/?utm_source=chatgpt.com

## For the configuration here is used, 
    will keep port 465, which requires a matching Nodemailer setting:
        const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
        });


## Here, secure: true matches port 465. 
    If instead use port 587, normally use secure: false and let Nodemailer upgrade the connection using STARTTLS.
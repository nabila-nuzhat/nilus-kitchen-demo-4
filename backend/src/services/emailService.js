/** NOTES:
 * CHECK FOR UPDATES-----------
 * Authentication: registration, email verification and login
    three endpoints will be used
    Method	Endpoint	                Purpose
    POST	/api/auth/register	        Create an unverified owner
    GET	    /api/auth/verify?token=...	Verify email
    POST	/api/auth/login	            Issue a JWT after
                                        successful verification
 * 
 */

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(email, token) {
  const verificationUrl =
    `${process.env.API_BASE_URL}/api/auth/verify?token=` +
    encodeURIComponent(token);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your Nilus Kitchen account",
    text:
      `Open this link to verify your account: ${verificationUrl}\n` +
      "If you did not request this account, ignore this email."
  });
}
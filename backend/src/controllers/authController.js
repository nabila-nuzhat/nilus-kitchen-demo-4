/** ATTENTION
 * 
 * ??????????? Production hardening required: add rate limiting to registration, login and verification endpoints; use a dedicated verification-token secret or token record with one-time-use semantics; avoid automatic account deletion on temporary SMTP failure in a production system; and use a secure session/cookie design or carefully managed short-lived JWTs. This example is a teaching baseline, not a complete security audit.
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";
import { sendVerificationEmail } from "../services/emailService.js";

export async function register(req, res, next) {
  try {
    const {
      name,
      email,
      password,
      registrationCode
    } = req.validatedBody;

    if (
      registrationCode !== process.env.OWNER_REGISTRATION_CODE
    ) {
      return res.status(403).json({
        message: "Invalid owner registration code"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingOwner = await Owner.findOne({
      email: normalizedEmail
    });

    if (existingOwner) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const owner = await Owner.create({
      name,
      email: normalizedEmail,
      passwordHash,
      isEmailVerified: false,
      role: "owner"
    });

    const verificationToken = jwt.sign(
      { sub: owner._id.toString(), purpose: "email-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    try {
      await sendVerificationEmail(
        owner.email,
        verificationToken
      );
    } catch {
      await Owner.deleteOne({ _id: owner._id });

      return res.status(502).json({
        message: "Could not send verification email. Try again."
      });
    }

    return res.status(201).json({
      message: "Registration received. Check your email to verify."
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.query;

    if (typeof token !== "string" || !token) {
      return res.status(400).json({
        message: "Verification token is required"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.purpose !== "email-verification") {
      return res.status(400).json({
        message: "Invalid verification token"
      });
    }

    const owner = await Owner.findById(decoded.sub);

    if (!owner) {
      return res.status(404).json({
        message: "Owner account not found"
      });
    }

    owner.isEmailVerified = true;
    await owner.save();

    return res.json({
      message: "Email verified. You can now log in."
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      return res.status(400).json({
        message: "Invalid or expired verification token"
      });
    }

    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.validatedBody;

    const owner = await Owner.findOne({
      email: email.toLowerCase().trim()
    }).select("+passwordHash");

    if (!owner) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      owner.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (!owner.isEmailVerified) {
      return res.status(403).json({
        message: "Verify your email before logging in"
      });
    }

    const token = jwt.sign(
      {
        sub: owner._id.toString(),
        role: owner.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
        role: owner.role
      }
    });
  } catch (error) {
    next(error);
  }
}
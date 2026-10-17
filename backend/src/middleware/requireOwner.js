/** check for updates-------- */
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

export async function requireOwner(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const token = authorization.slice(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const owner = await Owner.findById(decoded.sub);

    if (!owner || !owner.isEmailVerified || owner.role !== "owner") {
      return res.status(403).json({
        message: "Verified owner access required"
      });
    }

    req.owner = owner;
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}
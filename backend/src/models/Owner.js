/** NOTES:
 * Technical details:
    - String is the Mongoose schema type for text.
    - Boolean stores true/false values.
    - enum restricts the permitted role.
    - timestamps: true adds createdAt and updatedAt.
    - select: false prevents the password hash from being included in ordinary queries by default.
    - unique: true requests a unique database index for email.
 * 
 * A unique index is not a substitute for checking whether an email already exists. Handle duplicate-key errors in the backend as well.
 * 
 * Owner-only registration rule: public registration must not let arbitrary visitors become dashboard owners. Require the private OWNER_REGISTRATION_CODE when registering and verify the email before allowing login. For a production single-owner setup, the safest long-term option is to disable open registration after the owner's account is created.
 */
import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["owner"],
      default: "owner"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Owner", ownerSchema);
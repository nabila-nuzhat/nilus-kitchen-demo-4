## Check for Pending Email Verification option + Expiry time LATER UPDATE: inside Owner Model.
## emailVerificationTokenHash:{
      type: String,
      select: false, // updated
      // default: null, // : omit default: null.
              // Why?
              // - These fields are temporary verification data, not required user information.
              // - They only need values while verification is pending.
              // - After successful verification, the token hash and expiry date can be removed.
              // - Your code already checks whether a valid, unexpired token exists.
    },
## emailVerificationExpiresAt: {
      type: Date,
      select: false, // updated 
      // default: null, // : omit default: null.
              // Why?
              // - These fields are temporary verification data, not required user information.
              // - They only need values while verification is pending.
              // - After successful verification, the token hash and expiry date can be removed.
              // - Your code already checks whether a valid, unexpired token exists.
    },

## role: { 
    // leaves room for staff accounts later. It does not, by itself, implement moderator permissions. "staff" replaced by "moderator" 
      type: String,
      enum: ["owner", "moderator"],
      default: "owner",
    },   
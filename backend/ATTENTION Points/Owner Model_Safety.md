## Owner-only registration rule: 
    public registration must not let arbitrary visitors become dashboard owners. Require the private OWNER_REGISTRATION_CODE when registering and verify the email before allowing login. For a production single-owner setup, the safest long-term option is to disable open registration after the owner's account is created.

## Change Owner Model name -> User Model
## Room for more role -> like moderator to operate Later 


## Check for Pending Email Verification option + Expiry time LATER UPDATE:
    emailVerificationTokenHash:{
      type: String,
      select: false, // updated
      // default: null, // : omit default: null.
              // Why?
              // - These fields are temporary verification data, not required user information.
              // - They only need values while verification is pending.
              // - After successful verification, the token hash and expiry date can be removed.
              // - Your code already checks whether a valid, unexpired token exists.
    },

    emailVerificationExpiresAt: {
      type: Date,
      select: false, // updated 
      // default: null, // : omit default: null.
              // Why?
              // - These fields are temporary verification data, not required user information.
              // - They only need values while verification is pending.
              // - After successful verification, the token hash and expiry date can be removed.
              // - Your code already checks whether a valid, unexpired token exists.
    },

    role: { // leaves room for staff accounts later. It does not, by itself, implement moderator permissions. "staff" replaced by "moderator" 
      type: String,
      enum: ["owner", "moderator"],
      default: "owner",
    },   
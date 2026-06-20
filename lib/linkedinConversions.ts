/**
 * LinkedIn Conversion IDs Configuration
 * 
 * After creating conversion actions in LinkedIn Campaign Manager,
 * add their conversion IDs here.
 * 
 * To get conversion IDs:
 * 1. Go to Campaign Manager → Measurement → Conversion tracking
 * 2. Create a conversion action (e.g., "Schedule Meeting", "Lead Form")
 * 3. Copy the conversion ID from the code snippet
 * 4. Add it here or set it as an environment variable
 */

// LinkedIn Conversion IDs - Set these in .env or add them here
// Format: "123456" (string conversion ID from Campaign Manager)

export const LINKEDIN_CONVERSION_IDS = {
  // Schedule/Meeting booking conversion ID
  // Get this from Campaign Manager after creating a "Schedule" conversion action
  SCHEDULE: process.env.NEXT_PUBLIC_LINKEDIN_SCHEDULE_CONVERSION_ID || '',

  // Lead form conversion ID
  // Get this from Campaign Manager after creating a "Lead" conversion action
  LEAD: process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID || '',

  // Purchase conversion ID
  // Get this from Campaign Manager after creating a "Purchase" conversion action
  PURCHASE: process.env.NEXT_PUBLIC_LINKEDIN_PURCHASE_CONVERSION_ID || '',

  // SignUp conversion ID
  // Get this from Campaign Manager after creating a "SignUp" conversion action
  SIGNUP: process.env.NEXT_PUBLIC_LINKEDIN_SIGNUP_CONVERSION_ID || '',
};

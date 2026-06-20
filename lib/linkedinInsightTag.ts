/**
 * LinkedIn Insight Tag Tracking Helper
 * 
 * Similar to Google Ads and Meta Pixel tracking, this provides helper functions
 * to track LinkedIn campaign events throughout the application.
 * 
 * Required: Set NEXT_PUBLIC_LINKEDIN_PARTNER_ID in your environment variables
 * Format: 123456 (numeric partner ID from LinkedIn Campaign Manager)
 * 
 * IMPORTANT: For conversion tracking, you must first create conversion actions
 * in LinkedIn Campaign Manager and obtain conversion IDs for each conversion.
 * Then use those conversion IDs with the tracking functions below.
 * 
 * Setup Steps:
 * 1. Create Insight Tag in Campaign Manager (you've done this - Partner ID: 515334183)
 * 2. Create conversion actions in Campaign Manager (e.g., "Schedule Meeting", "Lead Form")
 * 3. Get the conversion ID for each conversion action
 * 4. Use the conversion IDs in your tracking calls
 */

// LinkedIn Partner ID - Set NEXT_PUBLIC_LINKEDIN_PARTNER_ID in .env
// Format: 123456 (numeric ID from LinkedIn Campaign Manager)
export const LINKEDIN_PARTNER_ID =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_LINKEDIN_PARTNER_ID) || '';

/**
 * Track a page view event
 * Note: LinkedIn automatically tracks pageviews when the Insight Tag loads.
 * This function is kept for consistency with other tracking libraries.
 */
export const pageview = () => {
  // LinkedIn Insight Tag automatically tracks pageviews when loaded
  // No explicit tracking needed - the tag handles this automatically
  if (typeof window !== 'undefined' && window.lintrk && LINKEDIN_PARTNER_ID) {
    // Pageviews are tracked automatically by LinkedIn Insight Tag
  }
};

/**
 * Track a conversion event using a conversion ID
 * 
 * IMPORTANT: You must create the conversion action in LinkedIn Campaign Manager first
 * and obtain its conversion ID before using this function.
 * 
 * @param conversionId - Conversion ID from LinkedIn Campaign Manager (e.g., "123456")
 * @param options - Event parameters (value, currency, transaction_id, etc.)
 */
export const trackConversion = (conversionId: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.lintrk && LINKEDIN_PARTNER_ID) {
    window.lintrk('track', {
      conversion_id: conversionId,
      ...options,
    });
  }
};

/**
 * Track a custom event (generic wrapper)
 * 
 * @param conversionId - Conversion ID from LinkedIn Campaign Manager
 * @param options - Event parameters
 */
export const event = (conversionId: string, options: Record<string, any> = {}) => {
  trackConversion(conversionId, options);
};

/**
 * Track Lead event
 * Maps to Meta Pixel's "Lead" and Google Ads' "Lead" events
 * 
 * IMPORTANT: Replace 'YOUR_LEAD_CONVERSION_ID' with your actual conversion ID
 * from LinkedIn Campaign Manager after creating a "Lead" conversion action.
 * 
 * @param conversionId - Your Lead conversion ID from Campaign Manager
 * @param options - Event parameters
 */
export const trackLead = (
  conversionId: string,
  options: {
    value?: number;
    currency?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    transactionId?: string;
    [key: string]: any;
  } = {}
) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

/**
 * Track Schedule event (meeting booking)
 * Maps to Meta Pixel's "Schedule" and Google Ads' "Schedule" events
 * 
 * IMPORTANT: Replace 'YOUR_SCHEDULE_CONVERSION_ID' with your actual conversion ID
 * from LinkedIn Campaign Manager after creating a "Schedule" conversion action.
 * 
 * @param conversionId - Your Schedule conversion ID from Campaign Manager
 * @param options - Event parameters
 */
export const trackSchedule = (
  conversionId: string,
  options: {
    value?: number;
    currency?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    transactionId?: string;
    [key: string]: any;
  } = {}
) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

/**
 * Track Purchase event
 * Maps to Meta Pixel's "Purchase" and Google Ads' "Purchase" events
 * 
 * IMPORTANT: Replace 'YOUR_PURCHASE_CONVERSION_ID' with your actual conversion ID
 * from LinkedIn Campaign Manager after creating a "Purchase" conversion action.
 * 
 * @param conversionId - Your Purchase conversion ID from Campaign Manager
 * @param options - Event parameters
 */
export const trackPurchase = (
  conversionId: string,
  options: {
    value: number;
    currency?: string;
    transactionId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
  }
) => {
  const {
    value,
    currency = 'USD',
    transactionId,
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

/**
 * Track SignUp event
 * Useful for user registrations
 * 
 * IMPORTANT: Replace 'YOUR_SIGNUP_CONVERSION_ID' with your actual conversion ID
 * from LinkedIn Campaign Manager after creating a "SignUp" conversion action.
 * 
 * @param conversionId - Your SignUp conversion ID from Campaign Manager
 * @param options - Event parameters
 */
export const trackSignUp = (
  conversionId: string,
  options: {
    value?: number;
    currency?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
  } = {}
) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  trackConversion(conversionId, {
    value,
    currency,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

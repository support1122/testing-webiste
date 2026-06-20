interface Window {
  gtag?: (
    command: "event" | "config" | "set" | "js" | string,
    targetId: string | Date,
    config?: {
      [key: string]: unknown;
    }
  ) => void;
  fbq?: (
    command: "init" | "track" | string,
    eventName?: string,
    params?: Record<string, any>
  ) => void;
  _fbq?: any;
  lintrk?: ((
    command: "track" | string,
    params?: Record<string, any>
  ) => void) & {
    q?: Array<[string, Record<string, any>]>;
  };
  _linkedin_partner_id?: string;
  _linkedin_data_partner_ids?: string[];
}


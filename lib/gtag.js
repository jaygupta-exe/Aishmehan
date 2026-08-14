export const GA_ADS_ID = "AW-18343832558";
export const GA_ANALYTICS_ID = "G-Z8KMK88MCB";
export const LEAD_CONVERSION_ID = "AW-18343832558/BHfICPa90-AcEO7XgqtE";

/**
 * Report Google Ads Conversion for Lead Form Submission
 * @param {string} [url] - Optional redirect URL
 */
export const gtagReportConversion = (url) => {
  if (typeof window !== "undefined") {
    if (typeof window.gtag_report_conversion === "function") {
      return window.gtag_report_conversion(url);
    }

    if (typeof window.gtag === "function") {
      const callback = () => {
        if (typeof url !== "undefined" && url) {
          window.location = url;
        }
      };

      window.gtag("event", "conversion", {
        send_to: LEAD_CONVERSION_ID,
        event_callback: callback,
      });
      return false;
    }
  }
  return false;
};

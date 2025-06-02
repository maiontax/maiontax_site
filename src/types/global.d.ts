declare global {
  interface Window {
    dataLayer: any[];
    google_tag_manager: any;
    gtag: (...args: any[]) => void;
  }
}

export {};

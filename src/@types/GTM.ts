interface Window {
  dataLayer?: Object[];
  gtag: (...args: any[]) => void;
  [key: string]: any;
}

export {};

declare global {
  interface Window {
    __resource: ArrayBuffer[];
  }
}

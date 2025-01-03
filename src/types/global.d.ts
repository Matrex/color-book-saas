export {};

declare global {
  interface Window {
    electron: {
      send: (channel: string, url: string) => void;
    };
  }
}

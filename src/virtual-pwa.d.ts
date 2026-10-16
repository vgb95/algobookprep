declare module "virtual:pwa-register" {
  export function registerSW(options?: {
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegisterError?: (error: any) => void;
  }): void;
}

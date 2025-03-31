/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly KV_REST_API_URL: string;
  readonly KV_REST_API_TOKEN: string;
  readonly TURNSTILE_SITE_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

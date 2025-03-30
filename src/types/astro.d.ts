/// <reference types="astro/client" />

interface ImportMetaGlob {
  [key: string]: {
    default: ImageMetadata;
  };
}

interface ImportMeta {
  glob: <T = unknown>(pattern: string, options?: { eager: true }) => ImportMetaGlob;
} 
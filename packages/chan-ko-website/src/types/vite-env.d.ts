/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

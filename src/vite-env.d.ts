/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PACKAGE_VERSION: string;
  readonly GIT_SHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

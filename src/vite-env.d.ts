/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_AUTH_TOKEN: string
  readonly VITE_GRAPHQL_HTTP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
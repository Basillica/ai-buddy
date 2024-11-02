/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_USER_ID: string;
    readonly VITE_PUBLIC_ENDPOINT: string;
    readonly SUPABASE_PROJECT_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

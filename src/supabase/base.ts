import { createClient } from "@supabase/supabase-js";
import { S3Client } from "@aws-sdk/client-s3";

export class APIHandler {
    redirectUrl = "link-to-app";

    getClient() {
        const supabase_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
        const api_key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        return createClient(supabase_url, api_key, {});
    }
}

export class S3Handler {
    getClient(access_token: string) {
        const supabase_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
        const access_key_id = import.meta.env.VITE_ACCESS_KEY_ID;
        const secret_access_key = import.meta.env.VITE_SECRET_ACCESS_KEY;
        return new S3Client({
            forcePathStyle: true,
            region: "eu-central-1",
            endpoint: `${supabase_url}/storage/v1/s3`,
            credentials: {
                accessKeyId: access_key_id,
                secretAccessKey: secret_access_key,
                sessionToken: access_token,
            },
        });
    }
}

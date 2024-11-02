import { APIHandler } from "./base";

export class BucketAPIHandler extends APIHandler {
    constructor() {
        super();
    }

    async createBucket(bucket: string): Promise<string | null> {
        const { data, error } = await this.getClient().storage.createBucket(bucket, {
            public: false,
            allowedMimeTypes: ["image/png", "application/pdf"],
            fileSizeLimit: 1024,
        });
        if (error) {
            console.log(error);
            return null;
        }
        console.log(data.name);
        return data.name;
    }

    async getBucket(bucket: string): Promise<Bucket | null> {
        const { data, error } = await this.getClient().storage.getBucket(bucket);
        if (error) {
            console.log(error);
            return null;
        }
        return data!;
    }

    async getAllBuckets(): Promise<Bucket[] | null> {
        const { data, error } = await this.getClient().storage.listBuckets();
        if (error) {
            console.log(error);
            return null;
        }
        return data;
    }

    async updateBucket(bucket: string): Promise<string | null> {
        const { data, error } = await this.getClient().storage.updateBucket(bucket, {
            public: false,
            allowedMimeTypes: ["image/png"],
            fileSizeLimit: 1024,
        });
        if (error) {
            console.log(error);
            return null;
        }
        return data.message;
    }

    async deleteBucket(bucket: string): Promise<string | null> {
        const { data, error } = await this.getClient().storage.deleteBucket(bucket);
        if (error) {
            console.log(error);
            return null;
        }
        return data.message;
    }

    async emptyBucket(bucket: string): Promise<string | null> {
        const { data, error } = await this.getClient().storage.emptyBucket(bucket);
        if (error) {
            console.log(error);
            return null;
        }
        return data.message;
    }

    async uploadFile(bucket: string, filepath: string, file: any): Promise<string | null> {
        const { data, error } = await this.getClient().storage.from(bucket).upload(filepath, file, {
            cacheControl: "3600",
            upsert: false,
        });
        if (error) {
            console.log(error);
            return null;
        }
        return data?.path;
    }

    async downloadFile(bucket: string, filePath: string): Promise<Blob | null> {
        const { data, error } = await this.getClient().storage.from(bucket).download(filePath);
        if (error) {
            console.log(error);
            return null;
        }
        return data;
    }

    async getAllFilesInBucket(bucket: string, folder: string): Promise<FileObject[] | null> {
        const { data, error } = await this.getClient()
            .storage.from(bucket)
            .list(folder, {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" },
            });
        if (error) {
            console.log(error);
            return null;
        }
        return data;
    }

    async replaceFile(bucket: string, filePath: string, file: any): Promise<string | null> {
        // "public/avatar1.png" folder/filepath
        const { data, error } = await this.getClient().storage.from(bucket).update(filePath, file, {
            cacheControl: "3600",
            upsert: true,
        });
        if (error) {
            console.log(error);
            return null;
        }
        return data?.path;
    }

    async deleteFile(bucket: string, filePaths: string[]): Promise<FileObject[] | null> {
        const { data, error } = await this.getClient().storage.from(bucket).remove(filePaths);
        if (error) return null;
        return data;
    }

    async getSignedUrl(bucket: string, filePath: string): Promise<string | null> {
        const { data, error } = await this.getClient().storage.from(bucket).createSignedUrl(filePath, 60); // in seconds
        if (error) return null;
        return data.signedUrl;
    }

    async getSignedUrls(bucket: string, filePaths: string[]): Promise<string[] | null> {
        const { data, error } = await this.getClient().storage.from(bucket).createSignedUrls(filePaths, 600); // in seconds
        if (error) return null;
        return data.map((item: any) => item.signedUrl);
    }

    async getUploadSignedUrl(
        bucket: string,
        folder: string,
        path: string
    ): Promise<{ url: string; token: string; path: string } | null> {
        const { data, error } = await this.getClient().storage.from(bucket).createSignedUploadUrl(`${folder}/${path}`);
        if (error) return null;
        return { url: data?.signedUrl, token: data?.token, path: data?.path };
    }

    async uploadWithSignedUrl(file: any, bucket: string, folder: string, path: string, token: string) {
        const { data, error } = await this.getClient()
            .storage.from(bucket)
            .uploadToSignedUrl(`${folder}/${path}`, token, file);
        if (error) return null;
        return data;
    }

    async getItemPublicUrl(publicBucket: string, fullPath: string): Promise<string> {
        // concatenating the bucket URL with the path to the assetconcatenating the bucket URL with the path to the asset
        const { data } = this.getClient().storage.from(publicBucket).getPublicUrl(fullPath);
        return data.publicUrl;
    }
}

export interface Bucket {
    id: string;
    name: string;
    owner: string;
    file_size_limit?: number;
    allowed_mime_types?: string[];
    created_at: string;
    updated_at: string;
    public: boolean;
}

export interface FileObject {
    name: string;
    bucket_id: string;
    owner: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: Record<string, any>;
    buckets: Bucket;
}

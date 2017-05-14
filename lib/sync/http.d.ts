import { CRUD } from './crud';
export interface HttpOptions {
    patch?: boolean;
    method?: string;
    body?: any;
    url?: string | any;
    query?: any;
    [key: string]: any;
}
export declare class SyncHttp extends CRUD {
    resolve(response: any): any;
    encode(): string;
    encodeUrl(query: any): string;
    create(options?: HttpOptions): Promise<any>;
    update(options?: HttpOptions): Promise<any>;
    read(options?: HttpOptions): Promise<any>;
    delete(options?: HttpOptions): Promise<any>;
}
export declare const METHODS: {
    GET: string;
    POST: string;
    PUT: string;
    PATCH: string;
    DELETE: string;
};

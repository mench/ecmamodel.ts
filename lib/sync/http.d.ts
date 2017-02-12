/// <reference types="core-js" />
import { CRUD } from './crud';
export interface HttpOptions {
    patch?: boolean;
    method?: string;
    body?: any;
    url?: string | any;
    query?: any;
}
export declare class SyncHttp extends CRUD {
    resolve(response: any): any;
    encode(): string;
    encodeUrl(query: any): string;
    create(): Promise<any>;
    update(): Promise<any>;
    read(options?: HttpOptions): Promise<any>;
    delete(): Promise<any>;
}
export declare const METHODS: {
    GET: string;
    POST: string;
    PUT: string;
    PATCH: string;
    DELETE: string;
};
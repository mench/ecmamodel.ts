/// <reference types="core-js" />
import { Emitter } from './utils/emitter';
import { Schema } from './schema';
import { SyncHttp, HttpOptions } from './sync/http';
export declare class Model extends Emitter {
    id: String;
    static PRIVATE: symbol;
    static CHANGES: symbol;
    static readonly index: any;
    readonly schema: Schema;
    readonly isNew: boolean;
    readonly index: any;
    readonly uuid: any;
    readonly url: void;
    get(key: any): this;
    set(key: any, value?: any, silent?: any): this;
    getId(): any;
    private commit(fire);
    constructor(data?: any);
    private register();
    toJSON(): any;
    protected readonly sync: SyncHttp;
    validate(cb?: Function): Promise<any>;
    parse(res: any): void;
    save(options?: {
        validate: boolean;
    }): Promise<this>;
    fetch(options?: HttpOptions): Promise<this>;
    private onDestroy();
    destroy(): this | Promise<this>;
}

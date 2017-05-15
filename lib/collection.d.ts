import { Model } from './model';
import { Emitter } from './utils/emitter';
import { SyncHttp, HttpOptions } from './sync/http';
export declare class Collection<T extends Model> extends Emitter {
    protected type: {
        new (data?): T;
    };
    protected indexes: {
        [k: string]: T;
    };
    protected array: Array<T>;
    constructor(type: {
        new (data?): T;
    });
    onCreate(item: T): void;
    onRemove(item: T): void;
    onItemChange(item: any, old: any): void;
    onItemIndex(model: T): void;
    onItemDestroy(model: T): void;
    readonly url: any | string;
    readonly length: number;
    get(id: any): T;
    typify(type: any): void;
    readonly sync: SyncHttp;
    clear(): void;
    add(data: any): T;
    prepend(data: any): T;
    remove(data: any): T;
    idOf(data?: any): any;
    map(cb: any): Array<any>;
    filter(cb: any): T[];
    indexOf(data: any): Number;
    each(cb: any): void;
    sort(cb: any): Array<T>;
    cleanup(cb: any): Array<T>;
    reset(data?: Array<any>): this;
    fetch(options?: HttpOptions): Promise<any>;
    parse(res: any): void;
    toObject(): any;
    toArray(): Array<T>;
    toJSON(): Array<T>;
}

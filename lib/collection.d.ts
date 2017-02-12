/// <reference types="core-js" />
import { Model } from './model';
import { Emitter } from './utils/emitter';
import { SyncHttp, HttpOptions } from './sync/http';
export declare class Collection extends Emitter {
    private type;
    private indexes;
    private array;
    constructor(type: Model | any);
    onCreate(item: Model): void;
    onRemove(item: Model): void;
    onItemChange(item: any, old: any): void;
    onItemIndex(model: Model): void;
    onItemDestroy(model: Model): void;
    readonly url: any | string;
    readonly length: number;
    get(id: any): Model;
    typify(type: any): void;
    readonly sync: SyncHttp;
    clear(): void;
    add(data: any): Model;
    remove(data: any): Model;
    idOf(data?: any): any;
    map(cb: any): Array<any>;
    filter(cb: any): Model[];
    indexOf(data: any): Number;
    each(cb: any): void;
    sort(cb: any): Array<Model>;
    cleanup(cb: any): Array<Model>;
    reset(data?: Array<any>): this;
    fetch(options?: HttpOptions): Promise<false | this>;
    parse(res: any): void;
    toObject(): any;
    toArray(): Array<Model>;
    toJSON(): Array<Model>;
}

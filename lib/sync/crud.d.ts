import { Model } from "../model";
import { Collection } from "../collection";
export declare class CRUD {
    protected entity: any | Model | Collection;
    constructor(entity: any);
    create(): void;
    read(): void;
    update(): void;
    delete(): void;
}

import { Exception } from './error';
export declare class CastError extends Exception {
    private field;
    private model;
    private value;
    constructor(type: any, key: string, kind: any, target: any);
}

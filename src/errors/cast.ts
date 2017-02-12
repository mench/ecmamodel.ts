import {Exception} from './error';
export class CastError extends Exception {
    private field:string;
    private model:any;
    private value:any;

    constructor(type:any,key:string,kind:any,target:any) {
        super(`Cast to ${type.name} failed at field ${key} on ${target.constructor.name} class`);
        this.field = key;
        this.model = target;
        this.value = kind;
    }
}



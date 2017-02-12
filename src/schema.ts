import {Cached} from './utils/cached';
import {Types} from './utils/types';
import {
    FiledString,
    FiledNumber,
    FiledArray,
    FiledObject,
    FiledBoolean,
    FiledDate,
    FiledAny,
    Filed
} from './fields';

export class Schema {
    public fields:Map<string,any>;

    static createField(options:any={}){
        switch (options.type){
            case String:
                return new FiledString(options);
            case Number:
                return new FiledNumber(options);
            case Array:
                return new FiledArray(options);
            case Boolean:
                return new FiledBoolean(options);
            case Date:
                return new FiledDate(options);
            case Object:
                return new FiledObject(options);
            default:
                return new FiledAny(options)
        }
    }

    constructor(){
        this.fields = new Map<string,any>();
    }
    set(key:string,options:any){
        this.fields.set(
            key,
            options
        );
        return this;
    }
    field(key:string){
        if(!this.fields.has(key)){
            this.set(
                key,
                Schema.createField()
            )
        }
        return this.fields.get(key);
    }
    @Cached
    get props():Array<string>{
        let props = [];
        this.fields.forEach((value, key)=>{
            props.push(key);
        });
        return props;
    }
}
import {Model} from './model';
import {Schema} from './schema';
import {Types} from './utils/types';

export const SCHEMA:string      = '__SCHEMA__';
export const INDEX:string       = '__index__';
export const __SCHEMA__:symbol  = Symbol('SCHEMA');

export function Field(target:any,key?):any{
    var options = Array.prototype.splice.call(arguments,0);
    function annotate(options,target,key){
        //TODO check if used on Model class. For skipping cross reference issue
        let isModelClass = (typeof Model == 'undefined' && Types.isFunction(target.constructor));
        if( isModelClass || target instanceof Model){
            var schema = target.constructor[SCHEMA];

            if(!schema){
                schema = target.constructor[SCHEMA] = new Schema();
            }
            schema.set(key,...options);

            return {
                enumerable:true,
                configurable:true,
                get:function(){
                    return this.get(key);
                },
                set:function(v){
                    return this.set(key,v);
                }
            };
        }
    }

    if( !Types.isObject(target) ){
        return annotate([],target,key);
    }
    return (t,k,d)=>{
        return annotate(options,t,k);
    }
}

export function Id(target,key){
    if(Types.isFunction(target.constructor)){
        target.constructor[INDEX] = key;
    }
}
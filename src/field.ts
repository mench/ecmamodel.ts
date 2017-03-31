import {Model} from './model';
import {Schema} from './schema';
import {Types} from './utils/types';

export const SCHEMA:symbol      = Symbol('SCHEMA');
export const INDEX:symbol       = Symbol('index');

export const mappings = new WeakMap();

export function Field(target:any,key?):any{
    var options = Array.prototype.splice.call(arguments,0);
    function annotate(options,target,key){
        //TODO check if used on Model class. For skipping cross reference issue
        let isModelClass = (typeof Model == 'undefined' && Types.isFunction(target.constructor));
        if( isModelClass || target instanceof Model){
            let schema = mappings.get(target.constructor);
            if(!schema){
                let ParentClass = target.constructor.prototype.__proto__.constructor;
                let parentSchema = mappings.get(ParentClass) || new Schema();
                schema = new Schema(parentSchema.fields);
                mappings.set(target.constructor,schema);
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
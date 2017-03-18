import {Cached} from '../utils/cached';
import {Model} from '../model';
import {Types} from '../utils/types';
import {Validator} from '../validators/validator';
import {ValidationError} from "../errors/validation";

export class Filed {
    public static uuid(){
        return <any>Math.round(Math.random()*Number.MAX_SAFE_INTEGER).toString(36);
    }

    @Option
    public type:any;
    @Option
    public default:any;
    @Option
    public required:Boolean;
    @Option
    public set set(v:Function){
        if(Types.isFunction(v)){
            this.setter(v);
        }
    }
    @Option
    public set get(v:Function){
        if(Types.isFunction(v)){
            this.getter = v;
        }
    }
    @Option
    public set validators(v:Array<Function>){
        if(Types.isArray(v)){
            v.map(o=>{
                if( o instanceof Validator){
                    this.customValidators.push(o);
                }
                return o;
            })
        }
    }
    protected setters:Array<Function>;
    protected verifiers:Array<Validator>;
    public customValidators:Array<Function>;
    public errors:Array<ValidationError>;
    protected getter:Function;

    constructor(options){
        this.setters = [];
        this.verifiers = [];
        this.errors  = [];
        this.customValidators  = [];
        Object.defineProperties(this,{
            type:{writable:true},
            default:{writable:true},
            required:{writable:true}
        });
        if( options ){
            Object.keys(options).forEach(k=>{
                if(this.options.indexOf(k) > -1){
                    this[k] = options[k];
                }
            });
        }
    }
    @Cached
    get options(){
        let CURRENT = Symbol.for(this.constructor.name),
            PARENT  = Symbol.for(Filed.name),
            current = this.constructor[CURRENT] || [],
            parent  = Filed[PARENT]  || [];
        return parent.concat(current);
    }
    protected setter(fn:Function){
        this.setters.push(fn.bind(this));
    }
    protected verifier(validator){
        this.verifiers.push(validator);
    }
    public cast(key,value,model){
        return value;
    }
    public apply(model,key,value){
        try {
            this.errors = [];
            value = this.cast(key,value,model);
            this.setters.forEach((setter:Function)=>{
                value = setter.call(this,key,value,model);
            });
            this.verifiers.forEach((validator:Validator)=>{
                try {
                    validator.set({
                        field:key,
                        model:model,
                        value:value
                    }).validate();
                }catch (e){
                    this.error(e);
                }
            });
            return value;
        }catch (e){
            console.error(e);
            this.errors.push(e);
        }
    }
    protected error(e){
        this.errors.push(e);
        return e;
    }
    public checkRequired(value):boolean{
        return value!=null;
    }
    public applyDefault(model,key):Filed{
        if(!Types.isUndefined(this.default)){
            model.set(key,this.default);
        }
        return this;
    }
    public uuid(){
        let self:any = this.constructor;
        return self.uuid();
    }

}
export function Option(target:any,key:string){
    let OPTION = Symbol.for(target.constructor.name);
    let props = target.constructor[OPTION];
    if(!props){
        props = target.constructor[OPTION] = [];
    }
    props.push(key);
}
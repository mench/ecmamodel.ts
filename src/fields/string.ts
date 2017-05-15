import {Filed,Option} from './field';
import {Types} from '../utils/types';
import {CastError} from '../errors/cast';
import {
    MaxLengthValidator,
    MinLengthValidator,
    EnumValidator,
    MatchValidator
} from '../validators';

export class FiledString extends Filed{

    @Option
    public set minLength(v:Number){
        if(Types.isNumber(v)){
            this.verifier(new MinLengthValidator(v));
        }
    }
    @Option
    public set maxLength(v:Number){
        if(Types.isNumber(v)){
            this.verifier(new MaxLengthValidator(v));
        }
    }
    @Option
    public set lowercase(v:Boolean){
        if(Types.toBoolean(v)){
            this.setter(function(key,value:String,target){
                if( value == null ){
                    return value;
                }
                return value.toLowerCase();
            })
        }
    }
    @Option
    public set uppercase(v:Boolean){
        if(Types.toBoolean(v)){
            this.setter(function(key,value:String,target){
                if( value == null ){
                    return value;
                }
                return value.toUpperCase();
            })
        }
    }
    @Option
    public set trim(v:Boolean){
        if(Types.toBoolean(v)){
            this.setter(function(key,value:String,target){
                if( value == null ){
                    return value;
                }
                return value.trim();
            })
        }
    }
    @Option
    public set enum(v:Array<string>){
        if(Types.isArray(v) && v.length!=0){
            this.verifier(new EnumValidator(v));
        }
    }
    @Option
    public set match(v:RegExp){
        if(v && v.test){
            this.verifier(new MatchValidator(v));
        }
    }
    public set set(v:Function){
        let setter = (key,value,target) =>{
            let res = v.call(this,key,value,target);
            if(Types.isValue(res)){
                return res;
            }
            return value;
        };
        this.setter(setter.bind(this));
    }
    public checkRequired(value):boolean{
        return <boolean>(value instanceof String || typeof value === 'string') && value.length;
    }
    public cast(key,value,model){
        if(Types.isString(value) || value == null ){
            return value;
        }
        if (value && value.toString && value.toString !== Object.prototype.toString) {
            return value.toString();
        }
        throw new CastError(this.type,key,value,model);
    }
}
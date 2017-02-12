import {Filed,Option} from './field';
import {Types} from '../utils/types';
import {CastError} from '../errors/cast';
import {
    MinNumberValidator,
    MaxNumberValidator
} from '../validators';

export class FiledNumber extends Filed{
    public static uuid(){
        return Math.round(Math.random()*Number.MAX_SAFE_INTEGER);
    }
    @Option
    public set min(v:Number){
        v = Types.toNumber(v);
        if( v ){
            this.verifier(new MinNumberValidator(v));
        }
    }
    @Option
    public set max(v:Number){
        v = Types.toNumber(v);
        if( v ){
            this.verifier(new MaxNumberValidator(v));
        }
    }
    public checkRequired(value){
        return typeof value === 'number' || value instanceof Number;
    }
    public cast(key,val,model){
        if (!Types.isNaN(val)) {
            if (val === null) {
                return val;
            }
            if (val === '') {
                return null;
            }
            if (typeof val === 'string' || typeof val === 'boolean') {
                val = Number(val);
            }
            if (val instanceof Number) {
                return val;
            }
            if (typeof val === 'number' && !Types.isNaN(val)) {
                return val;
            }
            if (val.toString && !Array.isArray(val) && val.toString() == Number(val)) {
                return new Number(val);
            }
        }

        throw new CastError(this.type,key,val,model);
    }
}
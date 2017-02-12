import {Filed,Option} from './field';
import types from '../utils/types';
import {CastError} from '../errors/cast';
import {
    MinDateValidator,
    MaxDateValidator
} from '../validators';

export class FiledDate extends Filed{

    @Option
    public set min(v:Date){
        v = types.toDate(v);
        if( v ){
            this.verifier(new MinDateValidator(v));
        }
    }
    @Option
    public set max(v:Date){
        v = types.toNumber(v);
        if( v ){
            this.verifier(new MaxDateValidator(v));
        }
    }
    public checkRequired(value) {
        return value instanceof Date;
    };
    public cast(key,value,model){
        let error = new CastError(this.type, key,value, model);
        if (value === null || value === void 0 || value === '') {
            return null;
        }
        if (value instanceof Date) {
            if (types.isNaN(value.valueOf())) {
                throw error;
            }
            return value;
        }
        let date;
        if (typeof value === 'boolean') {
            throw error;
        }
        let a:number        = Number(value);
        let b:any|string    = String(value);
        if (value instanceof Number || typeof value === 'number'
            || a == b) {

            date = new Date(Number(value));
        } else if (value.valueOf) {

            date = new Date(value.valueOf());
        }
        if (!types.isNaN(date.valueOf())) {
            return date;
        }
        throw error;
    }
}
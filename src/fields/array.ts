import {Filed} from './field';
import {Types} from '../utils/types';
export class FiledArray extends Filed{
    public checkRequired(value) {
        return !!(value && value.length);
    }
    public cast(key,value,model){
        return Types.toArray(value);
    }
}
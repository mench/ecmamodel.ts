import {Filed} from './field';
import {Types} from '../utils/types';

export class FiledBoolean extends Filed{
    public checkRequired(value) {
        return value === true || value === false;
    }
    public cast(key,value,model){
        return Types.toBoolean(value);
    }
}
import {Filed} from './field';
import {Types} from '../utils/types';
export class FiledObject extends Filed{
    public cast(key,value,model){
        try {
            if(Types.isObject(value)){
                return value;
            }
            value = JSON.parse(value);
            return value;
        }catch (e){
            return value;
        }
    }
}
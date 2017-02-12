import {Filed} from './field';
import {Model} from '../model';
import {Collection} from '../collection';
import {Types} from '../utils/types';

export class FiledAny extends Filed {
    public cast(key,value,model){
        if( Types.isObject(value) && this.type && this.type.prototype instanceof Model ){
            return new this.type(value);
        }
        if( Types.isArray(value) && this.type && this.type.prototype instanceof Collection ){
            let collection:Collection = new this.type();
            return collection.reset(value);
        }
        return super.cast(key,value,model);
    }
}

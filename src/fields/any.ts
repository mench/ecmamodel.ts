import {Filed} from './field';
import {Model} from '../model';
import {Collection} from '../collection';
import {Types} from '../utils/types';

export class FiledAny extends Filed {
    public cast(key,value,model){
        if( typeof value== 'object' && this.type && this.type.prototype instanceof Model ){
            return new this.type(value);
        }
        if( Array.isArray(value) && this.type && this.type.prototype instanceof Collection ){
            let collection:Collection<Model> = new this.type();
            return collection.reset(value);
        }
        return super.cast(key,value,model);
    }
}

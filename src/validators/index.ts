import {Validator} from './validator';
import {Types} from '../utils/types';

import {
    MaxLengthValidationError,
    MinLengthValidationError,
    EnumValidationError,
    MatchValidationError,
    MinNumberValidationError,
    MaxNumberValidationError,
    MinDateValidationError,
    MaxDateValidationError
} from '../errors/validation';

export {Validator}
export class MinLengthValidator extends Validator{
    public validate(){
        if(!Types.isValue(this.value)) return;
        let surrogatePairs = this.value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        let len = this.value.length - surrogatePairs.length;
        if( len >= this.kind ) return true;
        throw new MinLengthValidationError(this);
    }
}
export class MaxLengthValidator extends Validator{
    public validate(){
        if(!Types.isValue(this.value)) return;
        let surrogatePairs = this.value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
        let len = this.value.length - surrogatePairs.length;
        if( len <= this.kind ) return true;
        throw new MaxLengthValidationError(this);
    }
}
export class EnumValidator extends Validator{
    public validate(){
        if(!Types.isValue(this.value)) return;
        if(this.kind.indexOf(this.value) > -1) return true;
        throw new EnumValidationError(this);
    }
}
export class MatchValidator extends Validator{
    validate(){
        if(Types.isValue(this.value) && this.kind.test(this.value)){
            return true;
        }
        if( this.value == null ){
            return true;
        }
        throw new MatchValidationError(this);
    }
}
export class MinNumberValidator extends Validator{
    public validate(){
        if( this.value >= this.kind || this.value == null ){
            return true;
        }
        throw new MinNumberValidationError(this);
    }
}
export class MaxNumberValidator extends Validator{
    public validate(){
        if( this.value <= this.kind || this.value == null ){
            return true;
        }
        throw new MaxNumberValidationError(this);
    }
}
export class MinDateValidator extends Validator{
    public validate(){
        if(  this.value == null ){
            return;
        }
        if( this.value.getTime() >= this.kind.getTime() ){
            return true;
        }
        throw new MinDateValidationError(this)
    }
}
export class MaxDateValidator extends Validator{
    public validate(){
        if(  this.value == null ){
            return;
        }
        if( this.value.getTime() <= new Date().getTime() || this.value == null ){
            return true;
        }
        throw new MaxDateValidationError(this);
    }
}
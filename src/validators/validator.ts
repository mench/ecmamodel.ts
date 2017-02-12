import {Model} from '../model';

export class Validator {
    value:any;
    model:Model;
    field:string;
    kind:any;

    constructor(kind=null,value=null,field=null,model=null){
        this.kind       = kind;
        this.value      = value;
        this.model      = model;
        this.field      = field;
    }

    set(options ={}){
       for(let i in options){
           if(this.hasOwnProperty(i)){
               this[i] = options[i];
           }
       }
       return this;
    }

    public validate():any{
        throw new Error('method not overridden');
    }
}


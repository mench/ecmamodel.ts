import {Model} from "../model";
import {Collection} from "../collection";

export class CRUD {
    protected entity:any | Model | Collection<Model>;
    constructor(entity){
        this.entity = entity;
    }
    create(){}
    read(){}
    update(){}
    delete(){}
}
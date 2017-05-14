import {Model} from './model';
import {Emitter} from './utils/emitter';
import {Objects} from './utils/objects';
import {Bound} from './utils/bound';
import {Cached} from './utils/cached';
import {Types} from './utils/types';
import {SyncHttp,HttpOptions} from './sync/http';

export class Collection<T extends Model> extends Emitter {
    private type:T|any;
    private indexes:Object;
    private array:Array<T>;
    constructor(type:T | any){
        super();
        this.typify(type);
        this.indexes = Object.create(null);
        this.array = [];
        this.on('create',this.onCreate);
        this.on('remove',this.onRemove);
    }
    @Bound
    onCreate(item:Model){
        item.on('change',this.onItemChange);
    }
    @Bound
    onRemove(item:Model){
        item.off('change',this.onItemChange);
        item.off('index',this.onItemIndex);
        item.off('destroy',this.onItemDestroy);
    }
    @Bound
    onItemChange(item,old){
        this.emit('change',item,old);
    }
    @Bound
    onItemIndex(model:Model){
        let index = model.getId();
        if(index){
            delete this.indexes[model.uuid];
            this.indexes[index] = model;
        }
    }
    @Bound
    onItemDestroy(model:Model){
        this.remove(model);
    }
    get url():any |string{
        throw new Error('method not overridden');
    }
    get length(){
        return this.array.length
    }
    get(id):T{
        if(typeof id == 'object'){
            return this.indexes[id[this.type.index]] || this.indexes[id.uuid]
        }
        return this.indexes[id] || this.array.find(e=>e.id==id);
    }
    typify(type){
        if(type && typeof type == 'function' && type.prototype instanceof Model){
            this.type = type;
        }else{
            console.error(`${type} should be extended from Model class`);
            this.type = Model;
        }
    }
    @Cached
    get sync():SyncHttp{
        return new SyncHttp(this);
    }
    clear(){
        Object.keys(this.indexes).forEach(k=>{
            this.remove(this.indexes[k])
        });
        this.emit('clear');
    }
    add(data):T{
        if(!data) return;
        let id = this.idOf(data);
        if ( id ) {
            let item:T = this.get(data);
            if (!item) {
                if(!(data instanceof this.type)){
                    item = this.indexes[id] = new this.type(data);
                }else{
                    item = this.indexes[id] = data;
                }
                this.array.push(item);
                this.emit('create',item,this);
                item.on('index',this.onItemIndex);
                item.once('destroy',this.onItemDestroy);
            } else {
                item.set(data instanceof Model ? data.toJSON() : data);
            }
            return item;
        } else {
            return this.add(new this.type(data));
        }
    }
    prepend(data):T{
        if(!data) return;
        let id = this.idOf(data);
        if ( id ) {
            let item:T = this.get(data);
            if (!item) {
                if(!(data instanceof this.type)){
                    item = this.indexes[id] = new this.type(data);
                }else{
                    item = this.indexes[id] = data;
                }
                this.array.unshift(item);
                this.emit('create',item,this);
                item.on('index',this.onItemIndex);
                item.once('destroy',this.onItemDestroy);
            } else {
                item.set(data instanceof Model ? data.toJSON() : data);
            }
            return item;
        } else {
            return this.prepend(new this.type(data));
        }
    }
    remove(data):Model{
        if(!data) return null;
        let id = this.idOf(data);
        if ( id ){
            let item = this.get(data);
            if(item){
                var index = this.array.indexOf(item);
                if(index>=0){
                    this.array.splice(index,1);
                    delete this.indexes[id];
                    delete this.indexes[item.uuid];
                    this.emit('remove',item,index,this);
                }else{
                    delete this.indexes[id];
                    delete this.indexes[item.uuid];
                    return null;
                }
            }
            return item;
        }
        return null;
    }
    idOf(data:any={}){
        return data[this.type.index] || data.uuid;
    }
    map(cb):Array<any>{
        return this.array.map(cb)
    }
    filter(cb){
        return this.array.filter(cb)
    }
    indexOf(data):Number{
        return this.array.indexOf(data);
    }
    each(cb):void{
        this.array.forEach(cb);
    }
    sort(cb):Array<Model>{
        return this.array.sort(cb);
    }
    cleanup(cb):Array<Model>{
        return Object.keys(this.indexes)
            .filter(k=>cb(this.indexes[k]))
            .map(k=>this.remove(this.indexes[k]));
    }
    reset(data:Array<any> = []):this{
        Object.keys(this.indexes).forEach(k=>{
            this.onRemove(this.indexes[k]);
        });
        this.array = [];
        this.indexes = Object.create(null);
        data.forEach(item=>{
            this.add(item);
        });
        this.emit('reset',this,data);
        return this;
    }
    fetch(options:HttpOptions ={}){
        return this.sync.read(Objects.merge(options,{
            url:options.url || this.url,
            method:options.method,
            query:options.query || {},
            patch :options.patch
        })).then(res=>{
            if(Array.isArray(res)){
                return this.reset(res);
            }
            return false;
        })
    }
    parse(res){}
    toObject(){
        return Objects.merge({},this.indexes);
    }
    toArray():Array<Model>{
        return this.array.slice()
    }
    toJSON():Array<Model>{
        return this.array.slice().map((model:Model)=>{
            if(model instanceof Model){
                return model.toJSON();
            }
            return model;
        })
    }
}
import {Emitter} from './utils/emitter';
import {Types}   from './utils/types';
import {SCHEMA}  from './field';
import {mappings}  from './field';
import {Schema}  from './schema';
import {SyncHttp,HttpOptions} from './sync/http';
import {Cached} from './utils/cached';
import {Bound} from './utils/bound';
import {
    Id,
    INDEX,
    Field
} from './field';
import {
    RequiredValidationError,
    ValidationError
}  from './errors/validation';
import {Collection} from './collection';
import {Validator} from './validators';
import {Objects} from "./utils/objects";

export class Model extends Emitter {

    @Id
    @Field
    id:any;

    static PRIVATE:symbol = Symbol('private');
    static CHANGES:symbol = Symbol('changes');

    static get index(){
        return this[INDEX];
    }

    public get schema():Schema{
        return this[SCHEMA];
    }
    public get isNew():boolean{
        return !this[this.index];
    }
    public get index(){
        return this.constructor[INDEX];
    }
    @Cached
    public get uuid(){
        return this.schema
            .field(this.index)
            .uuid();
    }
    public get url():string{
        throw new Error('method not overridden');
    }
    public get(key):this{
        if(this[Model.PRIVATE]){
            let value = this[Model.PRIVATE][key];
            let field = this.schema.field(key);
            if( Types.isFunction(field.getter) ){
                return field.getter.call(this,value);
            }
            return value;
        }
        return null;
    }
    public set(key:any,value?,silent?){

        if(typeof key == 'object'){
            if(value==void 0){
                value=true;
            }
            for(let k in key){
                this.set(k,key[k]);
            }
            this.commit(value);
        }else{
            let field = this.schema.field(key);
            value = field.apply(this,key,value);
            if( field.errors.length ){
                return this;
            }
            let p = this[Model.PRIVATE];
            if(!p){
                p = this[Model.PRIVATE] = Object.create(null);
            }
            if(p[key] !== value){
                let c = this[Model.CHANGES];
                if(!c){
                    c = this[Model.CHANGES] = Object.create(null);
                }
                if(arguments.length>1){
                    c[key] = p[key];
                    p[key] = value;
                }else{
                    c[key] = p[key];
                    delete p[key];
                }
                this.commit(!silent);
            }
        }
        return this;
    }
    public getId(){
        return this[this.index];
    }
    private commit(fire){
        let revert = this[Model.CHANGES] || {};
        delete this[Model.CHANGES];
        if(fire){
            let changes = {};
            for(let k in revert){
                changes[k] = this[Model.PRIVATE][k];
                if(this.index == k){
                    this.emit('index',this,changes[k], revert[k]);
                    delete changes[k];
                    delete revert[k];
                }else{
                    this.emit(`change:${k}`, this, changes[k], revert[k]);
                }

            }
            if(Object.keys(changes).length){
                this.emit('change', this, changes, revert);
            }

        }
    }
    public constructor(data?){
        super();
        this.register();
        if(data){
            this.set(data,false);
        }
    }
    private register(){
        let schema = this[SCHEMA] = new Schema();
        let mapper = mappings.get(this.constructor) || new Schema();
        let props = mapper.fields;
        props.forEach((definition,key)=>{
            let field = Schema.createField(definition);
            schema.set(key,field);
            field.applyDefault(this,key);
        });
        this.once('destroy',this.onDestroy);
    }
    public toJSON(){
        let fields = this.schema.props;
        if(fields && fields.length){
            let map = Object.create(null);
            fields.forEach(f=>{
                if(!Types.isUndefined(this[f])){
                    map[f] = (this[f] instanceof Model
                    || this[f] instanceof Collection
                    ) ? this[f].toJSON() : this[f];
                }
            });
            return map;
        }else{
            return Object.create(null);
        }
    }
    @Cached
    protected get sync():SyncHttp{
        return new SyncHttp(this);
    }
    public validate(cb?:Function){
        return new Promise((resolve,reject)=>{
            let errors = [];
            let chain  = Promise.resolve();
            let props = this.schema.props;
            for(let i in props){
                let k = props[i];
                let v = this.get(k);
                var field = this.schema.field(k);
                errors = errors.concat(field.errors);
                if(field.required && !field.checkRequired(v)){
                    errors = errors.concat(new RequiredValidationError(k,v,this));
                    continue;
                }
                field.customValidators.forEach((validator:Validator)=>{
                    let cast = e =>{
                        if( typeof e != 'object' ){
                            e = new ValidationError(e,validator);
                        }
                        if( !(e instanceof ValidationError) ){
                           Object.setPrototypeOf(e,ValidationError.prototype);
                           Object.assign(e,validator);
                        }
                        return e;
                    };
                    try {
                        let error = validator.set({
                            value:v,
                            field:k,
                            model:this
                        }).validate();
                        if(error instanceof Promise){
                            chain = chain.then(r=>{
                                return error;
                            }).catch(e=>{
                                errors.push(cast(e));
                                return e;
                            })
                        }
                    }catch (e){
                        errors.push(cast(e));
                    }
                });
            }
            let callback = () =>{
                if(errors.length){
                    this.emit('validate',this,errors);
                    return reject(errors);
                }
                this.emit('validate',this,null);
                resolve(true);
            };
            chain.then(callback,callback);
        }).then(ok=>{
            if(typeof cb == 'function'){
                cb(null);
                return true;
            }
            return true;
        },errors=>{
            if(typeof cb == 'function'){
                cb(errors);
                return errors;
            }
            return Promise.reject(errors);
        })
    }
    public parse(res){}

    public save(options={validate:true},httpOpt:HttpOptions={}){
        let sync = ()=>{
            let save = () =>{
                if(this.isNew){
                    return this.sync.create(httpOpt).then(res=>{
                        return this.set(res);
                    });
                }
                return this.sync.update(httpOpt).then(res=>{
                    return this.set(res);
                });
            };
            return save().then(m=>{
                this.emit('save',m);
                return m;
            })
        };
        if(options.validate == false){
            return sync();
        }
        return this.validate()
            .then(ok=>{
                return sync();
            });
    }
    public fetch(options:HttpOptions={}){
        let url = this.isNew ? this.url : `${this.url}/${this[this.index]}`;
        return this.sync.read(Objects.merge(options,{
            url:options.url || url,
            method:options.method,
            query:options.query || {},
            patch :options.patch
        })).then(res=>{
            return this.set(res);
        })
    }
    @Bound
    private onDestroy(){
        this.off('save');
        this.off('validate');
        this.off('change');
        this.off('response');
        this.off('sync');
        this.schema.fields.forEach((f,k)=>{
            this.off(`change:${k}`);
        });
    }
    public destroy(options?:HttpOptions):this | Promise<this>{
        if(this.isNew){
            this.emit('destroy',this,null);
            return this;
        }
        return this.sync.delete(options).then(res=>{
            this.emit('destroy',this,res);
            return res;
        });
    }
}
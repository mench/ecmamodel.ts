import {CRUD} from './crud';
import {Bound} from '../utils/bound';
import {Objects} from "../utils/objects";

export interface HttpOptions {
    patch?:boolean;
    method?:string;
    body?:any;
    url?:string |any;
    query?:any;
    [key: string]: any;
}

export class SyncHttp extends CRUD{
    @Bound
    resolve(response){
       this.entity.emit('response',this.entity,response);
       let result = ()=>{
           let contType = response.headers.get('content-type');
           if(contType.indexOf('application/json') > -1){
               if(response.ok){
                   return response.json()
               }
               return Promise.reject(response.json());
           }
           if(response.ok){
               return response.text()
           }
           return Promise.reject(response.text());
       };
       return result().then(response=>{
           this.entity.emit('sync',this.entity,response);
           return this.entity.parse(response) || response;
       }).catch(error=>{
           this.entity.emit('error',this.entity,error);
           return Promise.reject(error);
       })
    }
    encode(){
        return JSON.stringify(this.entity.toJSON());
    }
    encodeUrl(query){
        if(query && typeof query == 'object' && Object.keys(query).length){
            return '?'+Object.keys(query)
                    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key]))
                    .join("&")
                    .replace(/%20/g, "+");
        }
        return "";
    }
    create(options:HttpOptions = {}):Promise<any>{
        return fetch(this.entity.url,Objects.merge(options, {
            method: "POST",
            body: this.encode(),
            headers: {
                "Content-Type": "application/json"
            }
        })).then(this.resolve,(e)=>{
            return Promise.reject(e);
        })
    }
    update(options:HttpOptions = {}):Promise<any>{
        return fetch(`${this.entity.url}/${this.entity[this.entity.index] ? this.entity[this.entity.index] : ''}`,Objects.merge(options, {
            method: "PUT",
            body: this.encode(),
            headers: {
                "Content-Type": "application/json"
            }
        })).then(this.resolve,(e)=>{
            return Promise.reject(e);
        })
    }
    read(options:HttpOptions = {patch:false}):Promise<any>{
        let params:any = {};
        if(options.patch == true){
            options.method = METHODS.PATCH;
        }
        params.method = options.method || METHODS.GET;
        let url = options.url || "/";
        if(params.method == METHODS.GET){
            url = url + this.encodeUrl(options.query);
        }else{
            params.body = JSON.stringify(options.query || {});
        }
        return fetch(url,Objects.merge(options,params)).then(this.resolve,(e)=>{
            return Promise.reject(e);
        })
    }
    delete(options:HttpOptions = {}):Promise<any>{
        return fetch(`${this.entity.url}/${this.entity[this.entity.index] ? this.entity[this.entity.index] : ''}`,Objects.merge(options, {
            method: "DELETE",
            body: this.encode(),
            headers: {
                "Content-Type": "application/json"
            }
        })).then(this.resolve,(e)=>{
            return Promise.reject(e);
        })
    }
}
export const METHODS = {
    GET     :"GET",
    POST    :"POST",
    PUT     :"PUT",
    PATCH   :"PATCH",
    DELETE  :"DELETE"
};
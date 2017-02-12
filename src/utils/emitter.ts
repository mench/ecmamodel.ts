const EVENTS:symbol = Symbol('listener');
const ORIGINAL:symbol = Symbol('listener');

export interface EventEmitter {
    on(event:string, listener:Function): Emitter;
    once(event:string, listener:Function): Emitter;
    off(event?:string, listener?:Function): Emitter;
    listeners(event?:string): Function[];
    emit(event:string, ...args:any[]): void;
}

export class Emitter implements EventEmitter {
    public static on(target:any,event:string,handler:Function,once:boolean=false){
        var listener:any = (...args:any[])=>{
            handler(...args);
            if(once){
                Emitter.off(target,event,handler)
            }
        };

        listener[ORIGINAL] = handler;

        let events = target[EVENTS];
        if(!events){
            events = target[EVENTS] = {};
        }
        let listeners:Function|Function[] = events[event];
        if(!listeners){
            events[event] = listener;
        }else
        if(typeof listeners=='function'){
            events[event] = [<Function>listeners,listener];
        }else{
            (<Function[]>listeners).push(listener);
        }
        return target;
    }
    public static off(target:any|any,event:string,handler:any|Function){
        let events = target[EVENTS];
        if(events){
            if(!handler){
                delete  events[event];
                return;
            }
            let listeners:any|Function|Function[] = events[event];
            if(typeof listeners=='function'){
                if((handler[ORIGINAL]||handler)===(listeners[ORIGINAL]||listeners)){
                    delete events[event];
                }
            } else
            if(listeners){
                var index=-1;
                for(var i=0;i<listeners.length;i++){
                    if((handler[ORIGINAL]||handler)===(listeners[i][ORIGINAL]||listeners[i])){
                        index=i;
                        break;
                    }
                }
                if(index>=0){
                    (<Function[]>listeners).splice(i,1);
                }
                if(listeners.length==1){
                    listeners = listeners[0];
                }else
                if(listeners.length==0){
                    delete events[event];
                }
            }else{
                delete target[EVENTS];
            }
            return target;
        }
    }
    public static listeners(target:any,event:string):Function[]{
        var events = target[EVENTS];
        if(events){
            var listeners = events[event];
            if(typeof listeners=='function'){
                return [listeners]
            } else
            if(listeners){
                var result:Function[] = [];
                for(var i=0;i<listeners.length;i++){
                    result.push(listeners[i]);
                }
                return result;
            }
        }
    }
    public static emit(target:any,event:string,...args:any[]):void{
        let listeners = Emitter.listeners(target,event);
        if(listeners && listeners.length){
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](...args);
            }
        }
    }
    on(event:string, listener:Function): Emitter {
        return Emitter.on(this,event,listener);
    }
    once(event:string, listener:Function): Emitter{
        return Emitter.on(this,event,listener,true);
    }
    off(event?:string, listener?:Function): Emitter{
        return Emitter.off(this,event,listener);
    }
    listeners(event?:string): Function[]{
        return Emitter.listeners(this,event);
    }
    emit(event:string, ...args:any[]): void {
        return Emitter.emit(this, event, ...args);
    }
}
export class Objects {
    static merge(source:any,...patches:any[]){
        return this.patch({},source,...patches)
    }
    static patch(source:any,...patches:any[]){
        for(let patch of patches){
            if(typeof patch == 'object'){
                for (let k in patch) {
                    source[k] = patch[k];
                }
            }
        }
        return source;
    }

}
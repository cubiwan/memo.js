class Memo {

    constructor (func, keyFunc) {
        this.func = func;
        this.cache = {}; 
        this.calculateKey = keyFunc || this.calculateKey;
    }

    call(){ 
        let key = this.calculateKey(...arguments);
        if(this.isInCache(key)){
            return this.cache[key];
        } else {
            let result = this.func(...arguments);
            this.add(key, result);
            return result;           
        }
    }

    calculateKey(){
        let args = Array.from(arguments);
        return JSON.stringify(args);
    }

    isInCache(key){
        return key in this.cache;
    }

    add(key, value){
        this.cache[key] = value;
    }

    getCache(){
        return JSON.stringify(this.cache);
    }
    
    loadCache(cache){
        this.cache = JSON.parse(cache);
    }

    eraseCache(){
        this.cache = {};
    }
}

function calculateKey(){
    let args = Array.from(arguments);
    return JSON.stringify(args);
}

function calculateKeySorted(){
    let args = Array.from(arguments).sort();    
    return JSON.stringify(args);
}

function calculateKeyToLowerCase(){
    let args = Array.from(arguments);    
    return JSON.stringify(args).toLowerCase();
}

class MemoTime extends Memo {
    constructor (func, timeOfLife, keyFunc) {
        super(func, keyFunc);
        this.timeOfLife = timeOfLife || 1000;
        this.lifetime = {};        
    }

    isInCache(key){
        if(key in this.lifetime) {
            if((new Date() - this.lifetime[key]) < this.timeOfLife){
                return true;
            }
        } else {
            return false;
        }
    }

    add(key, value){
        this.lifetime[key] = new Date();
        super.add(key, value);
    }
}
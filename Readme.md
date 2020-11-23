# Memo.js &nbsp;&nbsp;&nbsp;&nbsp;<a href='https://ko-fi.com/I2I012UF3' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

Memoization javascript library

### Install  

```html
<script src="memo.js"> </script>
```

### Use Memo

```
let memo = new Memo(function);
```
Create a memoization for function.  

```
memo.call(parameters);
```
Call to function.  

Example:  
```js
function sum(a,b){  
    console.log("calculating "+a+" + "+b);  
    return a+b;  
}  

let memo = new Memo(sum);  

console.log(memo.call(1,2)); //call sum  

console.log(memo.call(1,2)); //no call sum

console.log(memo.call(2,3)); //call sum  

console.log(memo.call(2,1)); //call sum  
```

```js
memo.getCache();
```
Return a copy of cache in a string.  

```js
memo.loadCache(cache);
```
Restore cache from a copy.  

```js
memo.eraseCache();
```
Remove cache.  

Example:  
```js
let storeMemoCache = memo.getCache(); //export cache values to string

let memo2 = new Memo(sum);

memo2.loadCache(storeMemoCache); //load cache

console.log(memo2.call(1,2)); //no call sum
```

```js
memo.calculateKey(parameters);
```
Return cache key for parameters.  

```js
memo.add(key, value);
```
Add value to cache.  

Example:
```js
memo.add(memo.calculateKey(3,3), 7); //add value 3,3 = 7

console.log(memo.call(3,3)); //no call sum, result 7
```

### Use MemoTime

```
let memo = new MemoTime(function, duration);
```
Create a memoization for function with lifetime in miliseconds.  

Example:
```js
let memoTime = new MemoTime(sum, 2000);

console.log(memoTime.call(4,5)); //call sum

console.log(memoTime.call(4,5)); //no call sum
setTimeout(memoTime.call(4,5),1000); //no call sum
setTimeout(memoTime.call(4,5),3000); //call sum
```

### Use other function to calculate cache key from parameters

```
let memo = new Memo(function, keyFunction);
let memoTime = new MemoTime(function, duration, keyFunction);
```

Example:
```js
let memo3 = new Memo(sum, calculateKeySorted); //calculateKeySorted 

console.log(memo3.call(2,3)); //call sum

console.log(memo3.call(2,3)); //no call sum

console.log(memo3.call(3,2)); //no call sum
```

Memo.js includes 3 calculate key functions:  
```js
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
```

### Recursion

Example:
```js
function factorial(n){
    console.log("factorial "+n);
    if(n < 2){
        return 1;
    } else {
        return factorial(n-1);
    }
}

let factM = new Memo(factorial);

factorial = (n) => factM.call(n);

factorial(3);
factorial(5);
```

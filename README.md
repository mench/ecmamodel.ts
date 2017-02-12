# ecmamodel.ts
TypeScript Model and Collection with validation,error handling and sync them with your existing API over a RESTful JSON interface.

ecmamodel.ts is a open source package for the node.js and browser.

## Requirements

ecmamodel.ts requires a Javascript environment with TypeScript classes and  decorators. 
#### Note.
On old browsers we are recommending to use **babel-polyfill** and **isomorphic-fetch**

## Usage

## Defining Model

Your all models should be extended from Model class.

Model fields should be defined by @Field decorator.
Field annotation takes optional properties which describe field 
   
```typescript
import {Model,Field} from 'ecmamodel.ts';

class User extends Model {

    @Field({
        type:String,
        trim:true,
        enum:['John','Smith']
        lowercase:true,
        required:true,
        set:function(key,value,target){},
        minLength:2,
        validators:[]
    })
    private name:String;
}

```

Type of field should be defined with **type** properties available in Field annotation.

### Available Field Types With Options

####String

- `lowercase`: {Boolean} calls .toLowerCase() method on the value

- `uppercase`: {Boolean} calls .toUpperCase() method on the value

- `trim`     : {Boolean} calls .trim() method on the value

- `match`    : {RegExp} creates a RegExp based validator.

- `enum`    : {Array} Creates an enum validator. If the value which is being set to the field is not in the Array, validation will fail.

- `minLength`    : {Number} Creates an min length validator. If the value is shorter than the minimum allowed length, validation will fail.

- `maxLength`    : {Number} Creates an max length validator. If the value is longer than the maximum allowed length, validation will fail.

####Number
  
- `min`: {Number} creates a validator which checks that the value which is being set is not less than the value specified.

- `max`: {Number} creates a validator which checks that the value which is being set is not greater than the value specified.

#### Date  

- `min`: {Date} creates a validator which checks that the value is before minimum allowed value.

- `max`: {Date} creates a validator which checks that the value is after maximum allowed value.

#### Boolean  

- no custom options

#### Array  

- no custom options

#### Object  

- no custom options

### Additional options 

- `default`.   will populate the field when it is created.

- `required`:{Boolean} validates if the value exists.

- `validators`:{Array} define custom validators with custom errors message.

- `set`:{Function} define field setter

for example.

```typescript
@Field({
    type:Number,
    set:function(key,value,target){ return value.toLowerCase() },
})
name:String;

ob.name = 'JOHN' // will return 'john'.
```

### Type Casting
Each property in our Model will be casted to its associated **type**
For example, we've defined a age as a String which will be cast to the Number and so on.
```typescript
@Field({
    type:Number 
})
age:Number;

ob.age = '15' // automatically cast values to Number (15)
```

### Custom Validators With Error Handling

Your validators should be extended from Validator class. and errors with ValidationError class

```typescript
import {Validator} from 'ecmamodel.ts';
import {ValidationError} from 'ecmamodel.ts';

export class CustomValidationError extends ValidationError {
    constructor(options){
        super(
            `custom error message`,
            options
        );
    }
}

export class CustomValidator extends Validator{
    public validate(){
        //to do someting
        //filed value will be this.value
        //model instance will be this.model
        //filed key will be this.filed
        //and options which passed from constructor will be this.kind
        throw new CustomValidationError(this);
    }
}
```
Validator supports synchronous and asynchronous validations.
```typescript
import {Validator} from 'ecmamodel.ts';

export class CustomValidator extends Validator{
    public validate(){
        return new Promise((resolve,reject)=>{
                 //to do someting
                 reject(new CustomValidationError(this))
        })
    }
}
```
   
And it's should be defined within `validators` option. for example

```typescript

class User extends Model {

    @Field({
        type:String,
        validators:[
            new CustomValidator(/** your custom options **/)
        ]
    })
    private name:string;
}

```
Validation work when validate() function is called
```typescript
const user = new User();
user.validate(errors=>{
    console.info(errors)
});
```
OR
```typescript
var user = new User();
user.validate()
.then(success=>{})
.catch(errors=>{
   console.info(errors)
});
```

#### Defining Model Id (unique identifier)

default id field is (id). but you can override it by using @Id decorator.
For example.

```typescript
import {Id,Field,Model} from 'ecmamodel.ts';

class User extends Model {
    
    @Id
    @Field({
        type:String
    })
    private _id:string;
}
```
You can have only one @Id field in each model
 
## Defining Models Collection

Your Models collection should be extended from Collection class. Collection constructor requires Model's class.

```typescript
import {Collection} from 'ecmamodel.ts';

class UserCollection extends Collection{
    constructor(){
        super(User);
    }
    get url(){
        return '/users'
    }
}
// we can add,remove and get model from collection

var collection = new UserCollection();
collection.add({id:1,name:"John"});
var id = 1;
var user = collection.get(id);
collection.remove(user);

//also we can reset,cleanup,clear callection data

collection.reset([{id:1,name:"John"},{id:2,name:"Smith"}])
collection.clear();
collection.cleanup((model)=>{return model.id == 1})
```

### API Integration

ecmamodel.ts is pre-configured to sync with a RESTful APIs. Simply create a new Model with the url of your resource endpoint:
You should override Model's and Collection's url getters. Getters should return endpoint urls 

```typescript

class User extends Model {
    public name:string;
    get url(){
        return '/users'
    }
}

var user  = new User();
user.name = "John";
user.save()
.then(success=>{})
.catch(errors=>{})
```
The Collection and Model components together form a direct mapping of REST resources using the following methods:

- GET  /users/ .... collection.fetch();

- POST /users/ .... model.save();//if it's new
- GET  /books/1 ... model.fetch();
- PUT  /books/1 ... model.save();
- DEL  /books/1 ... model.destroy();

After API's success response model and collection call 'parse()' method so you can transform  data
```typescript

class User extends Model {
    public get url(){
        return '/users'
    }
    public parse: function(data) {
        return data.user;
    }
}

var user  = new User();
user.name = "John";
user.save();
```


## Events

ecmamodel.ts Model and Collection have custom named events.

### Available Events

collection events

- `create` when a model is added to a collection.
- `remove` when a model is removed from a collection.
- `change` when model's fields are changed
- `reset`  when the collection's entire content has been reset (removed all the objects).

model events

- `change`   when a model's fields have changed.
- `change:[field]`    when a specific field has been updated.
- `validate`    when validate function is called
- `destroy`     when a model is destroyed.
- `sync`    when a model or collection has been successfully synced with the server.
- `error`    when a model's or collection's request to the server has failed.
- `response`    when a model or collection receives response to its request from the server.


## Examples

**model**: create,update and validate

```typescript
import 'babel-polyfill';

import {Model,Field} from 'ecmamodel.ts';

class User extends Model {

    @Field({
        type:String,
        trim:true,
        enum:['john','smith'],
        lowercase:true,
        required:true,
        minLength:4,
        maxLength:30,
        default:"John"
    })
    private name:string;
    
    @Field({
        type:Number,
        min:10,
        max:20
    })
    private age:Number;

}

const user = new User();
user.on('change',(model,newObject,oldObject)=>{
    console.info(model,newObject,oldObject);
});
user.on('change:name',(model,newValue,oldValue)=>{
    console.info(model,newValue,oldValue);
});
user.name = 'Smith';

user.on('validate',(model,errors)=>{
    console.info(errors)
});
user.name = 'wrong name';
user.validate(e=>{
    console.info(e)
});
//or
user.validate()
    .then(r=>{})
    .catch(e=>{
     console.info(e)
    })
```

**collection**: create and remove item
```typescript
import 'babel-polyfill';

import {Collection} from 'ecmamodel.ts';

class UserCollection extends Collection {
    constructor(){
        super(User);//specify the model class
    }

}

const collection = new UserCollection();
collection.on('create',(item,collection)=>{})
collection.on('renove',(item,index,collection)=>{})
collection.add({
    name:"Smith"
})
//or
let model = new User({name:"Smith",id:"1"});
collection.add(model)

//get item
var user:User = collection.get("1");
//or
var user:User = collection.get(model);

//remove item
collection.remove(user);
//or
collection.remove({id:"1"})
```

**sync with server**

```typescript
import 'babel-polyfill';
import 'isomorphic-fetch';//include for old browsers and node.js support

import {Model,Field} from 'ecmamodel.ts';

class User extends Model {

    @Field({
        type:String,
        trim:true,
        enum:['john','smith'],
        lowercase:true,
        required:true,
        minLength:4,
        maxLength:30,
        default:"John"
    })
    private name:string;
    
    @Field({
        type:Number,
        min:10,
        max:20
    })
    private age:Number;
    
    public get url(){
        return '/users';
    }

}

const user = new User({name:"smith",age:15});
user.on('sync',(model,response)=>{});
user.on('response',(model,response)=>{});
user.on('save',(model)=>{});

user.save()
    .then(data=>{})
    .catch(error=>{})
    
//will send 'POST' request to "POST /users" with user data

user.fetch({query:{name:"smith"}}) //will send  'GET' request to "GET /users" with query string
//with options patch user.fetch({patch:true}) will send PATCH request
//or
user.fetch({method:"POST"}) // default is 'GET'

```

They also works on Collections
```javascript

collection.fetch({method:"POST",query:{name:'smith'}})

```

##### Model Available methods

- get(key) - get Model by field name
- set(key,value,silent) - set new value for a specified field; if 'silent' is true, changes won't be triggered
- toJSON()
- validate(cb:Function) 
- save(options={validate:true})
- getId()
- parse(res)
- get url() (server endpoint) should be overridden 
- get isNew

##### Collection Available methods

- get(id)
- add(object)
- remove(object)
- clear()
- cleanup(cb:Function)
- reset(data:Array)
- fetch(options)
- parse(res)
- map(cb:Function)
- filter(cb:Function)
- each(cb:Function)
- sort(cb:Function)
- toObject()
- toArray()
- toJSON()
- get url() (server endpoint) should be overridden
- length

#### UTILS

ecmamodel.ts utility classes are located in 'ecmamodel.ts/lib/utils'
```typescript
import {
    Emitter,
    Bound,
    Cached,
    Objects,
    Types 
} from 'ecmamodel.ts/lib/utils'

```
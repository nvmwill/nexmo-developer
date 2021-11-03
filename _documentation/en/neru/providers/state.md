---
title: State
description: The State Provider
navigation_weight: 1
---

## State Provider

The State provider allows you to store data on NeRu for your project instance to use. The state provider has a key-value store at its root. As well as  lists and maps with various operations you can perform on them.

### Initializing the State Provider

To can access the state provider from a NeRu Instance.

```javascript
import { neru } from "neru-alpha";

const session = neru.createSession();
const state = session.getState();
```

On subsequent calls to your code you want to make sure that you are using the same instance to have access to your state. You can do so by initializing your instance from an incoming request. 

```javascript
router.post("/onMessage", async (req, res, next) => {
  try {
    const session = neru.getSessionFromRequest(req);
    const state = session.getState();

    // Handle incoming message
  } catch (error) {
    next(error);
  }
});
```

### Instance Level State

Instance level state is a singleton which you can use to share data across multiple instances. It comes handy when different flows are working together e.g. data is coming through 3rd party API that affect logic of voice/messages flow. 


```javascript
router.post("/onMessage", async (req, res, next) => {
  try {
    const state = neru.getInstanceState();

    // Handle incoming message
  } catch (error) {
    next(error);
  }
});
```

### State API reference 

#### Key-value operations

```javascript
  set<T>(key: string, value: T): Promise<string> 
  get<T>(key: string): Promise<T> 
  del(key: string): Promise<string> 
```
Example:

```javascript
router.post("/key-value", async (req, res, next) => {
  try {
    const session = neru.createSession();
    const state = session.getState();

    // create test object 
    const obj = { "foo": bar };

    // store object in the 
    await state.set("test_obj", obj);
    const obj2 = await state.get("test_obj");
    await state.del("test_obj");

  } catch (error) {
    next(error);
  }
})
```

#### Hashtable operations 

```javascript
   hdel(htable: string, key: string): Promise<string> 
   hexists(htable: string, key: string): Promise<string> 
   hgetall<T>(htable: string): Promise<T> 
   hmget<T>(htable: string, keys: string[]): Promise<T> 
   hvals<T>(htable: string): Promise<T> 
   hset(htable: string, keyValuePairs: [string, string][]): Promise<string> 
``` 

#### Usage 
```javascript
router.post("/add-customer", async (req, res, next) => {
	try {
	  const instanceState = neru.getInstanceState();
  
	  const customer = req.body;
	  await instanceState.hset("customers", [[customer.phone , customer ]] )
	} catch (error) {
	  next(error);
	}
})
  
router.get("/on-phone-call", async (req, res, next) => {
	try {
	  const instanceState = neru.getInstanceState();
	  const number = req.query.number;
	  const customer = await instanceState.hget("customers", number);
	  console.log("customer", customer);
	  res.send(customer.name);
	} catch (error) {
	  next(error);
	}
})
```

```sh
curl --location --request POST '{INSTANCE_ENDPOINT}/add-customer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"1",
    "name": "John",
    "phone": "101"
}'


curl --location --request GET '{INSTANCE_ENDPOINT}/on-phone-call?number=101'
```
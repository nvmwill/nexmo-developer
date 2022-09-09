---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const state = new State(session);

const customer = req.body.customer;

await state.hset("customers", { [customer.number]: JSON.stringify(customer) });
```
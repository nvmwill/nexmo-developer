---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const state = new State(session);

const customer = req.body.customer;
const number = customer.number;

await state.hset("customers", [[number , customer]]);
```
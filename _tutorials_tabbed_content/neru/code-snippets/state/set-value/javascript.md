---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const state = new State(session);

await state.set("neru_obj", { "foo": bar });
```
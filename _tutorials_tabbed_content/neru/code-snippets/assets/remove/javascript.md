---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const assets = new Assets(session);

await assets.remove('imgs', true).execute();
```
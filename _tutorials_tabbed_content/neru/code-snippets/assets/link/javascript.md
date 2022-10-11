---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const assets = new Assets(session);

const fileData = await assets.generateLink('/imgs/image.png', '5m').execute();
```
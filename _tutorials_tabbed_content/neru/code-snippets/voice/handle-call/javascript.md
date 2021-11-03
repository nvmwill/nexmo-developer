---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const voiceApi = new Voice(session);

const vonageNumber = { type: "phone", number: "447700900000" };

await voiceApi.onInboundCall('onCall', vonageNumber).execute();
```
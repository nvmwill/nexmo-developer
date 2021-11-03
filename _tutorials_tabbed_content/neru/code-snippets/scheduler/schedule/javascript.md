---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const scheduler = new Scheduler(session);

await scheduler.startAt({
    id: 'myScheduler',
    startAt: new Date(Date.now() + 5000).toISOString(),
    callback: 'onScheduler',
    payload: {
        text: 'hello world!',
    },
}).execute();
```
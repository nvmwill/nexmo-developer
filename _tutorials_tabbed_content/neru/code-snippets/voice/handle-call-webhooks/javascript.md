---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const voiceApi = new Voice(session);

await voice.onVapiAnswer("onAnswer").execute();

router.post('/onAnswer', async (req, res, next) => {
    const ncco = [
        {
            action: 'talk',
            text: "Hi from Vonage!",
        }
    ];
    res.json(ncco);
});
```
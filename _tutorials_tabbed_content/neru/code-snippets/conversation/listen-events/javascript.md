---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
router.post("/onCall", async (req, res) => {
    const session = neru.createSession();
    const voiceApi = new Voice(session);
    const conversation = await voiceApi.createConversation();
  
    await conversation.acceptInboundCall(req.body).execute();
    
    await conversation.listenForEvents("onEvent", [
      Filter("body.user.name", "contains", ["Alice"])
    ]).execute();
  
    res.status(200);
});
```
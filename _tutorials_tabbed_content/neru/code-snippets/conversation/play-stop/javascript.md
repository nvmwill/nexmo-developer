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

    const response = conversation.playStream({level: 0, loop: 1, streamUrl: ["https://acme.com/streams/music.mp3"]}).execute();

    await conversation.playStop(response.body.play_id).execute();

    res.status(200);
});
```
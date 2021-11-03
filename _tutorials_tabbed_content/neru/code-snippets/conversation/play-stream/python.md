---
title: Python
language: python
menu_weight: 1
---

```python
@app.post('/onCall')
async def call(request: Request):
    body = await request.json()
    session = neru.createSession()
    voice = Voice(session)
    conversation = await voice.createConversation()

    await conversation.acceptInboundCall(req.body).execute()

    playStreamBody = PlayStreamBody()
    playStreamBody.level = 0
    playStreamBody.loop = 1
    playStreamBody.streamUrl = ["https://acme.com/streams/music.mp3"]
    playStreamBody.queue = False
    await conversation.playStream(playStreamBody).execute()

    return 'OK'
```
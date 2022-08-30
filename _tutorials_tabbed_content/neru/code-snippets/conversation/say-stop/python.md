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

    await conversation.acceptInboundCall(body).execute()

    sayTextBody = SayTextBody()
    sayTextBody.text = 'Hi Alice!'
    response = await conversation.sayText(sayTextBody).execute()

    conversation.sayStop(response['say_id']).execute()

    return 'OK'
```
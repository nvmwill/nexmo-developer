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
    
    return 'OK'
```
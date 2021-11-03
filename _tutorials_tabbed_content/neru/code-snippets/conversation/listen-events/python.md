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

    filter_ = Filter()
    filter_.path = 'body.user.name'
    filter_.op = 'contains'
    filter_.values = ['Alice']

    await conversation.listenForEvents('onEvent', filter_).execute()

    return 'OK'
```
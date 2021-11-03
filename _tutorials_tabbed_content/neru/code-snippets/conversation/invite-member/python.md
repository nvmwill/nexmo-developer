---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
voice = Voice(session)

conversation = await voice.createConversation()

channel = Channel()
channel.id = 'channel_id'
channel.type_ = 'app'

await conversation.inviteMember('Alice', channel)
```
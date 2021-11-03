---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
voice = Voice(session)

conversation = await voice.getConversation('conversation_id', 'conversation_name')

await conversation.muteOn('member_id')
```